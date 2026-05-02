FROM node:22-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

RUN npm install

# Copy all source files
COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]