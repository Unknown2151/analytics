# ~~~~~ STAGE 1: The "Builder" stage ~~~~~
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the Prisma schema and the rest of the source code
COPY prisma ./prisma
COPY . .

# THE CRITICAL FIX: Generate the Prisma client BEFORE building the app
RUN pnpm exec prisma generate

# This build step will now succeed
RUN pnpm run build

# ~~~~~ STAGE 2: The "Production" stage ~~~~~
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy the built application from the "builder" stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Also copy the generated Prisma client, which is needed by the production server
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# It's also good practice to copy the schema itself
COPY --from=builder /app/prisma ./prisma

EXPOSE 5173
CMD ["node", "build/index.js"]