# ~~~~~ STAGE 1: The "Builder" stage ~~~~~
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY prisma ./prisma
RUN pnpm exec prisma generate
COPY . .

# ~~~~~ STAGE 2: The "Production" stage ~~~~~
FROM node:18-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy the generated Prisma client and the source code from the "builder" stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/index.js ./

# The command to run the worker script
CMD ["node", "index.js"]
