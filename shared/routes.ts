import { z } from 'zod';
import { insertToolSchema, tools } from './models/tools';

export const errorSchemas = {
  validation: z.object({ message: z.string() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
  paymentRequired: z.object({ message: z.string() }),
};

export const api = {
  tools: {
    list: {
      method: 'GET' as const,
      path: '/api/tools',
      responses: {
        200: z.array(z.custom<typeof tools.$inferSelect>())
      }
    },
    get: {
      method: 'GET' as const,
      path: '/api/tools/:slug',
      responses: {
        200: z.custom<typeof tools.$inferSelect>(),
        404: errorSchemas.notFound
      }
    },
    process: {
      method: 'POST' as const,
      path: '/api/tools/:slug/process',
      input: z.object({
        fileUrl: z.string().optional(),
        text: z.string().optional(),
        options: z.record(z.any()).optional()
      }),
      responses: {
        200: z.object({
          jobId: z.number(),
          status: z.enum(['pending', 'processing', 'completed', 'failed']),
          resultUrl: z.string().optional(),
          message: z.string().optional()
        }),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
        402: errorSchemas.paymentRequired,
        500: errorSchemas.internal
      }
    },
    getJob: {
      method: 'GET' as const,
      path: '/api/jobs/:id',
      responses: {
        200: z.object({
          id: z.number(),
          status: z.enum(['pending', 'processing', 'completed', 'failed']),
          resultUrl: z.string().optional(),
          metadata: z.any()
        }),
        404: errorSchemas.notFound
      }
    }
  },
  credits: {
    get: {
      method: 'GET' as const,
      path: '/api/credits',
      responses: { 
        200: z.object({ amount: z.number() }),
        401: errorSchemas.unauthorized
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
