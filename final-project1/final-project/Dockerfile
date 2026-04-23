# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port 5173 (Vite's default port)
EXPOSE 5173

# Start the application in dev mode, bound to all network interfaces
CMD ["npm", "run", "dev", "--", "--host"]