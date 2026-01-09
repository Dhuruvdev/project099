# Project 099 - All-in-One Digital Tools Platform

## Overview

Project 099 is a modern, SaaS-ready web application that provides a comprehensive suite of digital tools in one platform. The application includes image processing tools (background removal, compression, resizing), PDF tools (merge, split, convert), video/audio tools, AI-powered tools (text generation, image generation), developer utilities, and cybersecurity tools.

The platform uses a credit-based system where users consume credits when using tools, with free tier starting at 10 credits and paid tiers offering more. Authentication is handled via Replit Auth (OpenID Connect).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing with animated page transitions via Framer Motion
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming (light/dark mode support)
- **File Uploads**: Uppy with AWS S3 plugin for presigned URL uploads

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints defined in shared route schemas with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Replit Auth via OpenID Connect with Passport.js, sessions stored in PostgreSQL

### Data Storage Solutions
- **Primary Database**: PostgreSQL accessed via Drizzle ORM
- **Session Storage**: PostgreSQL with connect-pg-simple
- **File Storage**: Google Cloud Storage with presigned URL uploads via Replit Object Storage integration
- **Schema Location**: `shared/schema.ts` exports all models from `shared/models/`

### Key Data Models
- **Users**: Authentication users with profile information
- **Sessions**: Express session storage for authentication
- **Tools**: Tool definitions with slug, name, category, credit cost
- **User Credits**: Credit balance per user
- **Usage History**: Job tracking with status (pending/processing/completed/failed)
- **Conversations/Messages**: Chat history for AI tools

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Database Migrations**: Drizzle Kit with `db:push` command

## External Dependencies

### AI Services
- **OpenAI API**: Used for chat completions and image generation (gpt-image-1 model)
- **Configuration**: `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` environment variables

### Cloud Services
- **Google Cloud Storage**: File uploads via Replit Object Storage sidecar at `http://127.0.0.1:1106`
- **Presigned URLs**: Used for direct client-to-storage uploads

### Authentication
- **Replit Auth**: OpenID Connect provider at `https://replit.com/oidc`
- **Required Env Vars**: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`, `DATABASE_URL`

### Database
- **PostgreSQL**: Required, connection via `DATABASE_URL` environment variable
- **Mandatory Tables**: `sessions` and `users` tables are required for Replit Auth

### Third-Party Libraries
- **Uppy**: File upload widget with dashboard modal
- **Framer Motion**: Page transitions and animations
- **Radix UI**: Accessible component primitives
- **Zod**: Runtime validation for API contracts