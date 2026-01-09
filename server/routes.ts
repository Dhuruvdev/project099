import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // 1. Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // 2. Register Integrations
  registerChatRoutes(app);
  registerImageRoutes(app);
  registerObjectStorageRoutes(app);

  // 3. Tool Routes
  
  // Get all tools
  app.get(api.tools.list.path, async (req, res) => {
    const tools = await storage.getTools();
    res.json(tools);
  });

  // Get specific tool
  app.get(api.tools.get.path, async (req, res) => {
    const tool = await storage.getToolBySlug(req.params.slug);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.json(tool);
  });

  // Process tool request
  app.post(api.tools.process.path, isAuthenticated, async (req, res) => {
    try {
      const slug = req.params.slug;
      const tool = await storage.getToolBySlug(slug);
      
      if (!tool) return res.status(404).json({ message: "Tool not found" });

      const userId = (req.user as any).claims.sub;
      const credits = await storage.getUserCredits(userId);

      if (credits < tool.creditCost) {
        return res.status(402).json({ message: "Insufficient credits" });
      }

      await storage.deductCredits(userId, tool.creditCost);

      const input = api.tools.process.input.parse(req.body);

      // Create initial usage entry
      const job = await storage.createUsageEntry({
        userId,
        toolId: tool.id,
        toolSlug: tool.slug,
        status: "pending",
        metadata: input as any
      });

      // MOCK PROCESSING FOR NOW - In a real app, this would push to a queue (BullMQ)
      // We simulate async processing
      setTimeout(async () => {
        try {
          // Simulate processing time
          await new Promise(r => setTimeout(r, 2000));
          
          // Determine result based on tool type (Mock logic)
          let resultUrl = "https://via.placeholder.com/150";
          
          if (input.fileUrl) {
            // Echo back or transform
            resultUrl = input.fileUrl; 
          }

          await storage.updateUsageStatus(job.id, "completed", resultUrl);
        } catch (e) {
          await storage.updateUsageStatus(job.id, "failed");
        }
      }, 100);

      res.json({
        jobId: job.id,
        status: "pending",
        message: "Job started"
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get Job Status
  app.get(api.tools.getJob.path, isAuthenticated, async (req, res) => {
    const job = await storage.getUsageEntry(Number(req.params.id));
    if (!job) return res.status(404).json({ message: "Job not found" });
    
    // Security check: only owner can see job
    const userId = (req.user as any).claims.sub;
    if (job.userId !== userId) return res.status(401).json({ message: "Unauthorized" });

    res.json({
      id: job.id,
      status: job.status as any,
      resultUrl: job.resultUrl || undefined,
      metadata: job.metadata
    });
  });

  // Get Credits
  app.get(api.credits.get.path, isAuthenticated, async (req, res) => {
    const userId = (req.user as any).claims.sub;
    const amount = await storage.getUserCredits(userId);
    res.json({ amount });
  });

  // Seed Tools if empty
  await seedTools();

  return httpServer;
}

async function seedTools() {
  const toolsList = await storage.getTools();
  if (toolsList.length === 0) {
    const initialTools = [
      { slug: "remove-bg", name: "Remove background", description: "Instantly erase image backgrounds", category: "image", icon: "Eraser", creditCost: 2, isPopular: true },
      { slug: "pdf-merge", name: "Merge PDF", description: "Combine your PDF files with ease", category: "pdf", icon: "Files", creditCost: 1, isPopular: true },
      { slug: "text-to-image", name: "Text to Image AI", description: "Generate stunning images from text", category: "ai", icon: "Sparkles", creditCost: 3, isPopular: true },
      { slug: "video-convert", name: "MP4 to MP3", description: "Convert video audio in seconds", category: "video", icon: "Music", creditCost: 2, isPopular: true },
      
      // Other tools
      { slug: "image-resize", name: "Image Resizer", description: "Resize images to any dimension", category: "image", icon: "Maximize", creditCost: 1, isPopular: false },
      { slug: "json-formatter", name: "JSON Formatter", description: "Beautify and validate JSON", category: "dev", icon: "Braces", creditCost: 0, isPopular: false },
      { slug: "breach-check", name: "Breach Checker", description: "Check if your email has been compromised", category: "security", icon: "ShieldAlert", creditCost: 0, isPopular: false },
    ];

    for (const tool of initialTools) {
      await storage.createTool(tool);
    }
    console.log("Seeded tools");
  }
}
