# Start from the latest Node.js image
FROM node:latest

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm package files)
COPY package*.json ./

# Install dependencies (use --legacy-peer-deps if necessary for compatibility)
RUN npm install --legacy-peer-deps

# Copy the rest of the app code
COPY . .

# Build the Remix app (this generates the 'build' folder)
RUN npm run build

# Expose the port Remix will serve the app from
EXPOSE 3000

# Start the Remix app (make sure it's using the right build file)
CMD ["npm", "run", "start"]
