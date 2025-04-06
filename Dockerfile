# Stage 1: Build
FROM node:20-slim as builder

WORKDIR /build

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Run
FROM node:20-slim as runner

WORKDIR /app

COPY --from=builder /build/package.json ./
COPY --from=builder /build/public ./public
COPY --from=builder /build/.next .next
COPY --from=builder /build/next.config.ts ./
COPY --from=builder /build/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]
