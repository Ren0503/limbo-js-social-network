FROM node

WORKDIR /app/client

COPY package.json .
COPY yarn.lock .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]