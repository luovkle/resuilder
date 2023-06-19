FROM node:19-alpine AS builder
WORKDIR /app
COPY [ \
  "./app/package.json", \
  "./app/yarn.lock", \
  "/app/" \
]
RUN yarn install --no-cache
COPY [ \
  "./app/index.html", \
  "./app/tsconfig.json", \
  "./app/tsconfig.node.json", \
  "./app/vite.config.ts", \
  "./app/postcss.config.cjs", \
  "./app/tailwind.config.cjs", \
  "/app/" \
]
ADD ["./app/src", "/app/src/"]
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}
RUN yarn run build

FROM nginx:1.23-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
