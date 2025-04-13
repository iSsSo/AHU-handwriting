import { fonts, fontResults, type Font, type InsertFont, type FontResult, type InsertFontResult, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Font operations
  getAllFonts(): Promise<Font[]>;
  getFontByName(name: string): Promise<Font | undefined>;
  createFont(font: InsertFont): Promise<Font>;
  
  // Font results operations
  getFontResults(userId: number): Promise<FontResult[]>;
  getFontResultsByFont(userId: number, fontName: string): Promise<FontResult[]>;
  getBestFontResult(userId: number, fontName: string): Promise<FontResult | undefined>;
  createFontResult(result: InsertFontResult): Promise<FontResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private fonts: Map<number, Font>;
  private fontResults: Map<number, FontResult>;
  private userIdCounter: number;
  private fontIdCounter: number;
  private resultIdCounter: number;

  constructor() {
    this.users = new Map();
    this.fonts = new Map();
    this.fontResults = new Map();
    this.userIdCounter = 2; // Start from 2 since we're creating a user with ID 1
    this.fontIdCounter = 1;
    this.resultIdCounter = 1;
    
    // Create a default user
    this.users.set(1, {
      id: 1,
      username: 'default',
      password: 'password', // In a real app, this would be hashed
    });
    
    // Initialize with default fonts
    this.initializeFonts();
  }

  private initializeFonts() {
    const defaultFonts: InsertFont[] = [
      {
        name: 'Dancing Script',
        className: 'dancing',
        sampleTitle: 'Güzel Yazı',
        sampleText: 'Merhaba! Bu el yazısı fontunu taklit etmeye çalışın. Yumuşak kıvrımları ve akıcı çizgileri yakalamaya özen gösterin.',
        imagePath: '/assets/dancing-script-example.svg',
      },
      {
        name: 'Pacifico',
        className: 'pacifico',
        sampleTitle: 'Yuvarlak Hatlar',
        sampleText: 'Bu yazı stili daha yuvarlak ve bağlantılı. Harflerin birbirine geçişlerine dikkat edin.',
        imagePath: '/assets/pacifico-example.svg',
      },
      {
        name: 'Caveat',
        className: 'caveat',
        sampleTitle: 'Hızlı El Yazısı',
        sampleText: 'Hızlı bir şekilde yazılmış gibi görünen bu yazı stili daha dinamik çizgiler içerir.',
        imagePath: '/assets/caveat-example.svg',
      },
      {
        name: 'Indie Flower',
        className: 'indie',
        sampleTitle: 'Eğlenceli Stil',
        sampleText: 'Daha oyunbaz ve serbest bir el yazısı. Düzensiz hiza ve karakteristik harflere dikkat edin.',
        imagePath: '/assets/indie-flower-example.svg',
      },
      {
        name: 'Shadows Into Light',
        className: 'shadows',
        sampleTitle: 'İnce Hatlar',
        sampleText: 'İnce hatları olan bu yazı stilinde boşluklar ve oranlar oldukça önemli. Temiz çizgiler kullanın.',
        imagePath: '/assets/shadows-into-light-example.svg',
      }
    ];
    
    defaultFonts.forEach(font => this.createFont(font));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Font operations
  async getAllFonts(): Promise<Font[]> {
    return Array.from(this.fonts.values());
  }
  
  async getFontByName(name: string): Promise<Font | undefined> {
    return Array.from(this.fonts.values()).find(
      (font) => font.name === name,
    );
  }
  
  async createFont(insertFont: InsertFont): Promise<Font> {
    const id = this.fontIdCounter++;
    const font: Font = { ...insertFont, id };
    this.fonts.set(id, font);
    return font;
  }
  
  // Font results operations
  async getFontResults(userId: number): Promise<FontResult[]> {
    return Array.from(this.fontResults.values()).filter(
      (result) => result.userId === userId,
    );
  }
  
  async getFontResultsByFont(userId: number, fontName: string): Promise<FontResult[]> {
    return Array.from(this.fontResults.values()).filter(
      (result) => result.userId === userId && result.fontName === fontName,
    );
  }
  
  async getBestFontResult(userId: number, fontName: string): Promise<FontResult | undefined> {
    const results = await this.getFontResultsByFont(userId, fontName);
    if (results.length === 0) return undefined;
    
    return results.reduce((best, current) => {
      return current.matchPercentage > best.matchPercentage ? current : best;
    }, results[0]);
  }
  
  async createFontResult(insertResult: InsertFontResult): Promise<FontResult> {
    const id = this.resultIdCounter++;
    const result: FontResult = { ...insertResult, id };
    this.fontResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
