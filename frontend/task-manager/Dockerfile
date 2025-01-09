
FROM node:20.13.1-alpine3.19 as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20.13.1-alpine3.19
RUN addgroup -S blueblood && adduser -S blueblood -G blueblood
USER blueblood
WORKDIR /usr/app
COPY --from=build /app/src/dist/task-manager ./
CMD node server/server.mjs
EXPOSE 4000
