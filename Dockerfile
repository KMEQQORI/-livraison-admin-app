FROM node:14.15.4-alpine3.10 as builder

ENV YARN_VERSION 1.21.1
RUN yarn policies set-version $YARN_VERSION

WORKDIR /app

COPY ["./package.json", "/app/"]
RUN yarn install

COPY "./" "/app/"

RUN yarn build
# Clean devDependencies
RUN yarn install --production






FROM nginx:1.16.0-alpine as runtime

ENV NODE_ENV=production

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["chown", "nginx.nginx", "/var/cache/nginx/", "-R"]
CMD ["nginx", "-g", "daemon off;"]