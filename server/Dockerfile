FROM node:12 AS production

WORKDIR /app/server

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "start" ]