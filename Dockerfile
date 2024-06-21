FROM node:lts-alpine

WORKDIR /app
COPY package.json .

RUN npm install

# build時間が短くなる
COPY . .
CMD ["npm", "start"]