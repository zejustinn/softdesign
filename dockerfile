FROM node:18

WORKDIR /node

COPY package*.json ./
COPY . ./
COPY --chown=node:node . .

RUN chown -R node:node /node
RUN npm install

USER node

EXPOSE 8088

CMD [ "node", "./src/main.js" ]