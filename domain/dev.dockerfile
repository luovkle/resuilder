FROM node:21-alpine3.18
RUN npm -g install pnpm
WORKDIR /app
COPY ["./package.json", "./pnpm-lock.yaml", "/app/"]
RUN pnpm i --frozen-lockfile
COPY ["./tsconfig.json", "./astro.config.mjs", "./tailwind.config.mjs", "/app/"]
COPY ["./src", "/app/src/"]
EXPOSE 3000
CMD ["pnpm", "run", "dev", "--port", "3000", "--host"]
