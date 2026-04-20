FROM node:20

WORKDIR /app

# Copy only deps first (for caching)
COPY package*.json ./

RUN npm install

# Copy rest of the code
COPY . .

# Prisma client generation
RUN npx prisma generate

EXPOSE 8004

CMD ["node", "src/app.js"]