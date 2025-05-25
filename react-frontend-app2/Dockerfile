#Base Image
FROM node:16-alpine AS build

#working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Switch to a new lightweight Nginx image
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html 
RUN rm -rf ./*
COPY --from=build /app/build .
#COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]