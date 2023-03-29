FROM node:alpine3.11

RUN mkdir -p /app/backend

WORKDIR /app/backend

# Copy the app package and package-lock.json file
COPY package*.json ./
COPY backend.ts ./
COPY db.ts ./
COPY .env ./

# Install node packages
RUN npm install

# Install ts-node to run temporary backend.ts
RUN npm install -g ts-node

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .

# Expose $PORT on container.
EXPOSE $PORT

# Start the app
CMD [ "npm", "start" ]
