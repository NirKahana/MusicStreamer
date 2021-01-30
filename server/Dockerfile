FROM node:15.5.0-alpine3.12

ENV PORT=3001 
ENV DB_NAME=spotify 
ENV DB_PASSWORD=nirkahana8 
ENV DB_USER=root
ENV DB_HOST=db

WORKDIR '/app'

COPY package.json .

RUN npm install

EXPOSE 3001

COPY . .

CMD ["npm","start"]