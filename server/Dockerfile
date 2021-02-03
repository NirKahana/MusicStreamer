FROM node:15.5.0-alpine3.12

WORKDIR '/app'

COPY package.json .

RUN npm install

EXPOSE 3001

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["./wait-for-it/wait-for-it.sh", "db:3306", "--", "npm", "run", "start"]