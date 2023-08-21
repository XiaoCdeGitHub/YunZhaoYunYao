FROM node:16-alpine as build-stage

ARG SCRIPTS=build-test
WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm $SCRIPTS

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/website.conf /etc/nginx/conf.d/

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
