#FROM node:18
FROM node:20-alpine

#WORKDIR /usr/src/app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

#CMD ["npm", "run", "dev"]
CMD ["npm","start"]