FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn install --verbose

COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]