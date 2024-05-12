FROM node:21-alpine3.18 AS builder
RUN npm -g install pnpm
WORKDIR /app
COPY ["./package.json", "./pnpm-lock.yaml", "/app/"]
RUN pnpm i --frozen-lockfile
COPY ["./tsconfig.json", "./astro.config.mjs", "./tailwind.config.mjs", "/app/"]
COPY ["./src", "/app/src/"]
RUN pnpm run build

FROM nginx:1.25-alpine3.19 AS http-server
COPY --from=builder /app/dist /usr/share/nginx/html
