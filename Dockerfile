FROM node:20-alpine

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm ci --omit=dev

COPY app/ .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
