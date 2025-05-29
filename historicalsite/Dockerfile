# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV API_BASE_URL=http://backend:8888

# Copy only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copy built output and necessary files only
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Optional: if you use custom server (e.g., server.js)
# COPY --from=builder /app/server.js ./server.js

EXPOSE 3000
CMD ["npm", "start"]