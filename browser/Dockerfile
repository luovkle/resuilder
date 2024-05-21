FROM node:20-bookworm
RUN npm -g install pnpm
WORKDIR /app
COPY ["./package.json", "./pnpm-lock.yaml", "/app/"]
RUN pnpm i --frozen-lockfile
RUN pnpm playwright install --with-deps chromium
EXPOSE 3000
CMD ["pnpm", "run", "start"]
