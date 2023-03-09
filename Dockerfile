FROM node:14 AS builder

# Create app directory
WORKDIR /app

# COPY package.json ./
# COPY ./prisma ./prisma

COPY . .

# Install app dependencies
RUN npm install

RUN npm run build

# FROM node:14

# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]