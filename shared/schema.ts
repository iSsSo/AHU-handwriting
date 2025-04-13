import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Font practice results
export const fontResults = pgTable("font_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  fontName: text("font_name").notNull(),
  matchPercentage: integer("match_percentage").notNull(),
  shapeMatch: integer("shape_match").notNull(),
  slopeMatch: integer("slope_match").notNull(),
  scaleMatch: integer("scale_match").notNull(),
  fluencyMatch: integer("fluency_match").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertFontResultSchema = createInsertSchema(fontResults).omit({
  id: true,
});

// Font details
export const fonts = pgTable("fonts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  className: text("class_name").notNull(),
  sampleTitle: text("sample_title").notNull(),
  sampleText: text("sample_text").notNull(),
  imagePath: text("image_path").notNull(),
});

export const insertFontSchema = createInsertSchema(fonts).omit({
  id: true,
});

// Analysis result schema for the API response
export const analysisResultSchema = z.object({
  matchPercentage: z.number().min(0).max(100),
  shapeMatch: z.number().min(0).max(100),
  slopeMatch: z.number().min(0).max(100),
  scaleMatch: z.number().min(0).max(100),
  fluencyMatch: z.number().min(0).max(100),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFontResult = z.infer<typeof insertFontResultSchema>;
export type FontResult = typeof fontResults.$inferSelect;

export type InsertFont = z.infer<typeof insertFontSchema>;
export type Font = typeof fonts.$inferSelect;

export type AnalysisResult = z.infer<typeof analysisResultSchema>;
