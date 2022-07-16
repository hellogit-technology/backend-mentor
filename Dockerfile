FROM node:current-buster-slim
WORKDIR /app
COPY package.json .
RUN npm install && npm install typescript -g
COPY . .
RUN tsc
CMD node dist/server.js 