# Use an official Meteor runtime as a parent image
FROM geoffreybooth/meteor-base:latest

# Set the working directory
WORKDIR /app

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install Node.js dependencies
RUN meteor npm install
RUN meteor npm install --save @babel/runtime

# Copy the rest of the application
COPY . .

# Set METEOR_ALLOW_SUPERUSER to avoid permission issues
ENV METEOR_ALLOW_SUPERUSER=true

# Build the Meteor app
RUN meteor build --directory /app/build --server-only

# Change to the server bundle directory and install server dependencies
WORKDIR /app/build/bundle/programs/server
RUN npm install

# Change back to the app directory
WORKDIR /app

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "/app/build/bundle/main.js"]
