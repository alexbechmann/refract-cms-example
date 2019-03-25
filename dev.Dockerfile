FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn install --frozen-lockfile
RUN apt-get update
RUN apt-get install dos2unix

COPY ./dev.docker-entrypoint.sh .
RUN dos2unix ./dev.docker-entrypoint.sh

COPY ./razzle.config.js .
COPY ./tsconfig.json .
COPY tslint.json .
COPY .prettierrc .

EXPOSE 3000
EXPOSE 3001

RUN chmod +x ./dev.docker-entrypoint.sh

ENTRYPOINT ["./dev.docker-entrypoint.sh"]