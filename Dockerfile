FROM oven/bun:latest AS builder

WORKDIR /app
COPY package*.json bun.lock ./
RUN bun install

COPY . .
RUN bun run build

FROM nginx:latest

RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
