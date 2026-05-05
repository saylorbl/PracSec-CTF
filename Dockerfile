FROM node:18-slim

# 1. Install build tools needed to compile native SQLite3 bindings
RUN apt-get update && apt-get install -y \
    python3 \
    sqlite3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. Copy ONLY package files first
COPY package*.json ./

# 3. Force a fresh build of native modules inside the container
# This ensures it links against the container's version of GLIBC
RUN npm install --build-from-source

# 4. Now copy the rest of your code
COPY . .

# 5. Run your DB setup
RUN python3 setup_db.py

EXPOSE 3000

CMD ["npm", "start"]