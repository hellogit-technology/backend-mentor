FROM node:current-buster-slim
WORKDIR /app
COPY package.json .
RUN npm install && npm run deploy
COPY . ./
CMD node dist/server.js 