# Use an official Node runtime as a parent image
FROM node:16

# Set environment variable to redirect npm cache
ENV NPM_CONFIG_CACHE=/app/.npm

# Set the working directory to /app
WORKDIR /app

# Copy package.json and lock files first
COPY ./package*.json ./

# Create writeable npm cache dir
RUN mkdir -p /app/.npm && chmod -R 777 /app/.npm

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 (for development only)
EXPOSE 3005

# Start the development server
CMD ["npm", "start"]
