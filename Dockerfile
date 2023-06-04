FROM node:18 AS base

# Specify a working directory in the base image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

RUN npx prisma generate

#RUN npx prisma migrate dev --name init

# Expose the port the app runs in
EXPOSE 3000

# Command to run the application
# CMD [ "npm", "start" ]
CMD /bin/bash -c "npx prisma migrate dev --name init && npm start"