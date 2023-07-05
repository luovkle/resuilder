FROM node:19-alpine
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
WORKDIR /app
COPY [ \
  "./app/package.json", \
  "./app/yarn.lock", \
  "/app/" \
]
RUN yarn install --no-cache
COPY [ \
  "./app/nest-cli.json", \
  "./app/tsconfig.json", \
  "./app/tsconfig.build.json", \
  "/app/" \
]
ADD ["./app/test", "/app/test/"]
ADD ["./app/src", "/app/src/"]
EXPOSE 8001
CMD ["yarn", "start"]
