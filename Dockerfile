# Use offiial Nodejs runtime as base image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code 
COPY . .

# Expose the port on which app running 
EXPOSE 5173

# Start the app in development mode with --host option
CMD ["npm", "run", "dev", "--", "--host"]

