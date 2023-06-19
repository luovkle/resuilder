FROM node:19-alpine AS builder
WORKDIR /app
COPY ["./app/package.json", "/app/"]
RUN yarn install --no-cache
COPY [ \
  "./app/index.html", \
  "./app/tsconfig.json", \
  "./app/tsconfig.node.json", \
  "./app/vite.config.ts", \
  "/app/" \
]
ADD ["./app/src", "/app/src/"]
RUN yarn run build

FROM nginx:1.23-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
