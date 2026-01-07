# Frontend Dockerfile - Multi-stage build
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies only
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/vite.config.js ./vite.config.js

EXPOSE 4173

# Run Vite preview server on all interfaces
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
