FROM node:12.22-slim

# make the '/usr/src/app' folder the current working directory
WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . .

# build app for production with minification.
RUN npm run build

# use production node environment by default.
ENV NODE_ENV production

# run the application.
EXPOSE 8081
CMD npm run start
