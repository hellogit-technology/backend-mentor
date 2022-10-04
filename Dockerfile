FROM node:17-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=production
RUN npm install pm2 -g
COPY . .
EXPOSE 5000
CMD ["pm2-runtine", "dist/server.js"]