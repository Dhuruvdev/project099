import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Tool Categories
export const TOOL_CATEGORIES = [
  "image", "pdf", "video", "audio", "ai", "dev", "security"
] as const;

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // e.g., 'remove-bg', 'merge-pdf'
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category", { enum: TOOL_CATEGORIES }).notNull(),
  creditCost: integer("credit_cost").default(1).notNull(),
  isPopular: boolean("is_popular").default(false),
  icon: text("icon").notNull(), // Lucide icon name
});

export const userCredits = pgTable("user_credits", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // References auth.users.id
  amount: integer("amount").default(10).notNull(), // Free tier start
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usageHistory = pgTable("usage_history", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  toolId: integer("tool_id").references(() => tools.id),
  toolSlug: text("tool_slug").notNull(),
  status: text("status", { enum: ["pending", "processing", "completed", "failed"] }).notNull(),
  resultUrl: text("result_url"),
  metadata: jsonb("metadata"), // Store inputs/options used
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertToolSchema = createInsertSchema(tools);
export const insertUsageSchema = createInsertSchema(usageHistory);

export type Tool = typeof tools.$inferSelect;
export type UserCredit = typeof userCredits.$inferSelect;
export type UsageHistory = typeof usageHistory.$inferSelect;
