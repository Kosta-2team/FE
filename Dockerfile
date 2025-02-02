#FROM node:18
FROM node:20-alpine
#FROM node:16

#WORKDIR /usr/src/app
WORKDIR /app

COPY package*.json ./

RUN npm install dotenv

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

#EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
#CMD ["npm", "run", "dev"]
#CMD ["npm","start"]