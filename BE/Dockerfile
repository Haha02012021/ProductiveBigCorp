FROM node:alpine
EXPOSE 5000
WORKDIR /backend/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "start"]