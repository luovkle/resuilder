FROM node:19-alpine
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
EXPOSE 3000
CMD ["yarn", "run", "dev", "--", "--host", "--port", "3000"]
