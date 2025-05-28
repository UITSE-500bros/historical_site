# --- Stage 1: Build the NestJS app ---
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN \
  if [ -f package-lock.json ]; then npm install; \
  elif [ -f yarn.lock ]; then yarn install; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  fi

# Copy source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the project
RUN npm run build

# --- Stage 2: Production image ---
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Set NODE_ENV
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 8888

# Start the app
CMD ["node", "dist/src/main.js"]
