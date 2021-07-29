FROM node:14-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn install --production=false

COPY . .

RUN yarn build

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm install --only=production
RUN yarn install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/main"]
