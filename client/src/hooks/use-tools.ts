import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Fetch all tools
export function useTools() {
  return useQuery({
    queryKey: [api.tools.list.path],
    queryFn: async () => {
      const res = await fetch(api.tools.list.path);
      if (!res.ok) throw new Error("Failed to fetch tools");
      return api.tools.list.responses[200].parse(await res.json());
    },
  });
}

// Fetch single tool by slug
export function useTool(slug: string) {
  return useQuery({
    queryKey: [api.tools.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.tools.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch tool");
      return api.tools.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// Process a tool action (start job)
type ProcessToolInput = z.infer<typeof api.tools.process.input>;

export function useProcessTool(slug: string) {
  return useMutation({
    mutationFn: async (data: ProcessToolInput) => {
      const url = buildUrl(api.tools.process.path, { slug });
      const res = await fetch(url, {
        method: api.tools.process.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        if (res.status === 402) throw new Error("Insufficient credits");
        if (res.status === 400) {
          const err = await res.json();
          throw new Error(err.message || "Validation failed");
        }
        throw new Error("Failed to process tool");
      }

      return api.tools.process.responses[200].parse(await res.json());
    },
  });
}

// Poll for job status
export function useJob(id: number | undefined) {
  return useQuery({
    queryKey: [api.tools.getJob.path, id],
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.tools.getJob.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch job");
      return api.tools.getJob.responses[200].parse(await res.json());
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Stop polling if completed or failed
      if (status === "completed" || status === "failed") return false;
      return 1000; // Poll every 1s
    },
  });
}

// Get user credits
export function useCredits() {
  return useQuery({
    queryKey: [api.credits.get.path],
    queryFn: async () => {
      const res = await fetch(api.credits.get.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch credits");
      return api.credits.get.responses[200].parse(await res.json());
    },
  });
}
