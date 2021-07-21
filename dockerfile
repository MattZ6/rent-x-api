FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]
