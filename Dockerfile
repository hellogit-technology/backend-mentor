FROM node:17
WORKDIR /app
COPY package.json .
RUN npm install && npm run deploy
COPY . ./
CMD node dist/server.js 