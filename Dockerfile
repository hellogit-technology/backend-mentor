FROM node:17
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npm install pm2 -g
COPY . .
EXPOSE 5000
CMD ["pm2-runtine", "dist/server.js"]