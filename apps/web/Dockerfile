FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm turbo

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @encelion/database db:generate
RUN pnpm --filter @encelion/web build

EXPOSE 3000
CMD ["pnpm", "--filter", "@encelion/web", "start"]
