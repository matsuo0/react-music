FROM node:lts-alpine

WORKDIR /app
COPY package.json .

RUN npm install

# build時間が短くなる
COPY . .
# CMD ["npm", "start"]

CMD npm start --host 0.0.0.0 --port 80 --disableHostCheck true