FROM node

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

EXPOSE 3300

CMD npx prisma generate && npm run start
