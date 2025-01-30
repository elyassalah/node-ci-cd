# Use an official Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on (adjust the port if necessary)
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
