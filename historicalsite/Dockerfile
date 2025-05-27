# --- Stage 1: Install dependencies and build the app ---
    FROM node:22-alpine AS builder

    WORKDIR /app
    
    # Copy dependency files
    COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
    
    # Install dependencies
    RUN \
      if [ -f package-lock.json ]; then npm install; \
      elif [ -f yarn.lock ]; then yarn install; \
      elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
      fi
    
    # Copy the rest of the application
    COPY . .
    
    # Build the Next.js application
    RUN npm run build
    
    # --- Stage 2: Production container ---
    FROM node:22-alpine AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Copy only necessary files for production
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    # Expose the port that Next.js runs on
    EXPOSE 3000
    
    # Start the application
    CMD ["npm", "start"]
    