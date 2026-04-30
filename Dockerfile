# Use a Node.js base image
FROM node:18-slim

# Install Python and SQLite3 (needed for the database and setup script)
RUN apt-get update && apt-get install -y python3 sqlite3

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Run the database setup script to generate plunder.db
RUN python3 setup_db.py

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]