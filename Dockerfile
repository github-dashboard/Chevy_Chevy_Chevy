FROM node:10-alpine
WORKDIR /usr/local/src
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 9090
CMD ["npm", "start"]
