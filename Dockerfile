FROM node:24-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm i

COPY . .

RUN npm run compile

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]
