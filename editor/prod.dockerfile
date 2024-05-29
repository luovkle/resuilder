FROM node:21-alpine3.18 AS builder
RUN npm -g install pnpm
WORKDIR /app
COPY ["./package.json", "./pnpm-lock.yaml", "/app/"]
RUN pnpm i --frozen-lockfile
COPY [ \
  "./index.html", "./tsconfig.json", "./vite.config.ts", \
  "./postcss.config.js", "./tailwind.config.js", "./tsconfig.node.json", \
  "/app/" \
  ]
COPY ["./src", "/app/src/"]
ARG VITE_EDITOR_API_HTTP_URL
ARG VITE_RENDERER_HTTP_URL
ARG VITE_GENERATOR_HTTP_URL
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ENV VITE_EDITOR_API_HTTP_URL=${VITE_EDITOR_API_HTTP_URL}
ENV VITE_RENDERER_HTTP_URL=${VITE_RENDERER_HTTP_URL}
ENV VITE_GENERATOR_HTTP_URL=${VITE_GENERATOR_HTTP_URL}
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}
RUN pnpm run build

FROM nginx:1.25-alpine3.19 AS http-server
COPY --from=builder /app/dist /usr/share/nginx/html
