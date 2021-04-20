# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app


# install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install --silent
ENV NODE_ENV="produccion"
# add app
COPY . .

EXPOSE 3600

# start app
CMD ["npm", "start"]