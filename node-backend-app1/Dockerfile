
# set argument for the Node.js version.
ARG NODE_VERSION=22.15.0

# Use the official Node.js image as the base image.
FROM node:${NODE_VERSION}-alpine

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the image.
COPY ./node-backend-app1/package*.json ./

# Install the application dependencies.
RUN npm install 

# Copy the rest of the source files into the image.
COPY ./node-backend-app1 .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD node src/index.js
