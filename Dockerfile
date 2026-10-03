# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /build
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# EmailJS keys are inlined into the client bundle at build time.
ARG NEXT_PUBLIC_EMAILJS_SERVICE_ID
ARG NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
ARG NEXT_PUBLIC_EMAILJS_USER_ID
ENV STANDALONE=1 NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Stage 2: Run (standalone server only — no full node_modules)
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0

COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/.next/static ./.next/static
COPY --from=builder /build/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
