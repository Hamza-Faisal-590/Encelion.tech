FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm turbo

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @encelion/database db:generate
RUN pnpm --filter @encelion/api build

EXPOSE 4000
CMD ["node", "apps/api/dist/main.js"]
