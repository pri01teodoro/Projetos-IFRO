FROM node:18
ARG PORT_BUILD=3010

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT $PORT_BUILD
ENV SECRET chavesecreta
ENV EXPIREIN 2000h

EXPOSE $PORT_BUILD

WORKDIR /usr/src/app

ENTRYPOINT npm run dev