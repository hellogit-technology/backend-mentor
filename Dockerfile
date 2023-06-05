# Builder 
FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run deploy

# Production 
FROM node:17-alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npm install pm2 -g
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views
EXPOSE 8080
CMD ["pm2-runtime", "build/server.bundle.js"]