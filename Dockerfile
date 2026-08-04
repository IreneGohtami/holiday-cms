# Multi-stage build for Strapi v5
# Stage 1: Install dependencies and build
FROM node:22-slim AS build

RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm ci --include=dev

COPY . .

ENV NODE_ENV=production

RUN npm run build

# Remove dev dependencies and rebuild for production only
RUN npm ci --omit=dev

# Stage 2: Production image
FROM node:22-slim AS production

RUN apt-get update && apt-get install -y \
    libvips42 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

ENV NODE_ENV=production

COPY --from=build /opt/app/package.json /opt/app/package-lock.json ./
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/favicon.png ./favicon.png

# Strapi needs these at runtime
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/src ./src
COPY --from=build /opt/app/tsconfig.json ./tsconfig.json

EXPOSE 1337

CMD ["npm", "run", "start"]
