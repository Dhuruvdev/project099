import { db } from "./db";
import {
  tools,
  userCredits,
  usageHistory,
  type Tool,
  type UserCredit,
  type UsageHistory
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Tools
  getTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<Tool | undefined>;
  createTool(tool: typeof tools.$inferInsert): Promise<Tool>;
  
  // Credits
  getUserCredits(userId: string): Promise<number>;
  deductCredits(userId: string, amount: number): Promise<void>;
  addCredits(userId: string, amount: number): Promise<void>;
  
  // Usage
  createUsageEntry(entry: typeof usageHistory.$inferInsert): Promise<UsageHistory>;
  getUsageEntry(id: number): Promise<UsageHistory | undefined>;
  updateUsageStatus(id: number, status: string, resultUrl?: string): Promise<void>;
  getUserHistory(userId: string): Promise<UsageHistory[]>;
}

export class DatabaseStorage implements IStorage {
  async getTools(): Promise<Tool[]> {
    return await db.select().from(tools);
  }

  async getToolBySlug(slug: string): Promise<Tool | undefined> {
    const [tool] = await db.select().from(tools).where(eq(tools.slug, slug));
    return tool;
  }

  async createTool(tool: typeof tools.$inferInsert): Promise<Tool> {
    const [newTool] = await db.insert(tools).values(tool).returning();
    return newTool;
  }

  async getUserCredits(userId: string): Promise<number> {
    const [credit] = await db.select().from(userCredits).where(eq(userCredits.userId, userId));
    if (!credit) {
      // Initialize if not exists
      const [newCredit] = await db.insert(userCredits).values({ userId, amount: 10 }).returning();
      return newCredit.amount;
    }
    return credit.amount;
  }

  async deductCredits(userId: string, amount: number): Promise<void> {
    const current = await this.getUserCredits(userId);
    if (current < amount) throw new Error("Insufficient credits");
    
    await db.update(userCredits)
      .set({ amount: current - amount, updatedAt: new Date() })
      .where(eq(userCredits.userId, userId));
  }

  async addCredits(userId: string, amount: number): Promise<void> {
    const current = await this.getUserCredits(userId);
    await db.update(userCredits)
      .set({ amount: current + amount, updatedAt: new Date() })
      .where(eq(userCredits.userId, userId));
  }

  async createUsageEntry(entry: typeof usageHistory.$inferInsert): Promise<UsageHistory> {
    const [newEntry] = await db.insert(usageHistory).values(entry).returning();
    return newEntry;
  }

  async getUsageEntry(id: number): Promise<UsageHistory | undefined> {
    const [entry] = await db.select().from(usageHistory).where(eq(usageHistory.id, id));
    return entry;
  }

  async updateUsageStatus(id: number, status: string, resultUrl?: string): Promise<void> {
    await db.update(usageHistory)
      .set({ status: status as any, resultUrl, id }) // id is just to satisfy typescript if needed or just use where
      .where(eq(usageHistory.id, id));
  }

  async getUserHistory(userId: string): Promise<UsageHistory[]> {
    return await db.select()
      .from(usageHistory)
      .where(eq(usageHistory.userId, userId))
      .orderBy(desc(usageHistory.createdAt));
  }
}

export const storage = new DatabaseStorage();
