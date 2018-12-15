FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --verbose

COPY . .

RUN npm run build

EXPOSE 5001

CMD [ "npm", "run", "start:prod" ]