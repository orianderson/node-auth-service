FROM node:14 AS builder
# FROM ubuntu:22.04 AS builder

# RUN apt-get update && apt-get upgrade -y
# RUN apt-get install apt-utils -y
# RUN apt-get install curl -y
# RUN curl -sL https://deb.nodesource.com/setup_18.14
# RUN apt-get install -y nodejs npm

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies
# RUN npm install -g yarn
# RUN yarn install
# RUN yarn build

RUN npm install
RUN npm run build

FROM node:14

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/data.json ./data.json
RUN npx prisma generate

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]

