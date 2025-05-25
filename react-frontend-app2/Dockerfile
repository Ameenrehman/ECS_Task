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
FROM nginx:alpine

# Create required cache dir and give permission to non-root user
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R 101:101 /var/cache/nginx

# Copy the built files from the previous stage (build) to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Set user to non-root
USER 101

# Expose port 80 for the application
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
