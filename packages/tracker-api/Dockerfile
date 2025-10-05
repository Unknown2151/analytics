# ~~~~~ STAGE 1: The "Builder" stage ~~~~~
# We name this stage "builder" so we can refer to it later.
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies like Prisma CLI)
RUN pnpm install --frozen-lockfile

# Copy the Prisma schema
COPY prisma ./prisma

# Generate the Prisma Client. This works now because the CLI was installed.
RUN pnpm exec prisma generate

# Copy the rest of the application source code
COPY . .


# ~~~~~ STAGE 2: The "Production" stage ~~~~~
# Start from a fresh, clean image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install pnpm again in this clean environment
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# This time, install ONLY production dependencies
RUN pnpm install --frozen-lockfile --prod

# **The Magic Step**
# Copy the generated Prisma client and the source code from the "builder" stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/index.js ./

# Expose the port
EXPOSE 3001

# Define the run command
CMD ["node", "index.js"]