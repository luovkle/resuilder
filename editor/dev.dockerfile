FROM node:21-alpine3.18
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
EXPOSE 3000
CMD ["pnpm", "run", "dev", "--port", "3000", "--host"]
