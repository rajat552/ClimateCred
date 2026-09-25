FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm@9.11.0

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* turbo.json ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm --filter @climatetwin/api build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 3001
CMD ["node", "apps/api/dist/server.js"]
