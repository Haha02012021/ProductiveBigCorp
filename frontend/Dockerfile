FROM node:alpine
EXPOSE 3000
WORKDIR /frontend/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm i --legacy-peer-deps
CMD ["npm", "start"]