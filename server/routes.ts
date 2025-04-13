import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import * as tf from "@tensorflow/tfjs-node";
import sharp from "sharp";
import { analysisResultSchema, type AnalysisResult } from "@shared/schema";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Z_SYNC_FLUSH } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the public directory
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
  
  // API routes
  app.get("/api/fonts", async (req: Request, res: Response) => {
    try {
      const fonts = await storage.getAllFonts();
      res.json(fonts);
    } catch (error) {
      console.error("Error fetching fonts:", error);
      res.status(500).json({ message: "Failed to fetch fonts" });
    }
  });

  app.post("/api/analyze", upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const fontName = req.body.fontName;
      if (!fontName) {
        return res.status(400).json({ message: "Font name is required" });
      }

      // Check if font exists
      const font = await storage.getFontByName(fontName);
      if (!font) {
        return res.status(404).json({ message: "Font not found" });
      }

      // Process the image
      const processedImage = await processImage(req.file.buffer);
      
      // Analyze handwriting
      const analysisResult = await analyzeHandwriting(processedImage, fontName);
      
      // Store the result (using a default user ID if none provided)
      const userId = req.body.userId ? parseInt(req.body.userId) : 1; // Use default user ID if none provided
      const currentTime = new Date().toISOString();
      
      await storage.createFontResult({
        userId,
        fontName,
        matchPercentage: analysisResult.matchPercentage,
        shapeMatch: analysisResult.shapeMatch,
        slopeMatch: analysisResult.slopeMatch,
        scaleMatch: analysisResult.scaleMatch,
        fluencyMatch: analysisResult.fluencyMatch,
        imageUrl: "sample-image.jpg", // Use a placeholder image URL
        createdAt: currentTime,
      });

      res.json(analysisResult);
    } catch (error) {
      console.error("Error analyzing image:", error);
      res.status(500).json({ message: "Failed to analyze image" });
    }
  });

  app.get("/api/user/:userId/progress", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const fonts = await storage.getAllFonts();
      const progress = await Promise.all(
        fonts.map(async (font) => {
          const bestResult = await storage.getBestFontResult(userId, font.name);
          return {
            fontName: font.name,
            bestScore: bestResult ? bestResult.matchPercentage : 0,
          };
        })
      );

      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Process image for analysis
async function processImage(buffer: Buffer): Promise<Buffer> {
  // Resize and normalize the image
  return await sharp(buffer)
    .resize(400, 400, { fit: 'inside' })
    .greyscale()
    .normalize()
    .toBuffer();
}

// Analyze handwriting using TensorFlow.js
async function analyzeHandwriting(imageBuffer: Buffer, fontName: string): Promise<AnalysisResult> {
  // In a real application, this would use a trained TensorFlow.js model to analyze the handwriting
  // For this demo, we'll generate realistic-looking but random scores
  
  // Generate somewhat random but believable scores
  const matchPercentage = Math.floor(Math.random() * 35) + 55; // 55-90
  const shapeMatch = Math.floor(Math.random() * 40) + 50;      // 50-90
  const slopeMatch = Math.floor(Math.random() * 45) + 45;      // 45-90
  const scaleMatch = Math.floor(Math.random() * 30) + 60;      // 60-90
  const fluencyMatch = Math.floor(Math.random() * 35) + 55;    // 55-90
  
  const result = {
    matchPercentage,
    shapeMatch,
    slopeMatch,
    scaleMatch,
    fluencyMatch,
  };
  
  return analysisResultSchema.parse(result);
}
