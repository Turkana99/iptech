FROM node:22.14-alpine3.21 as build

WORKDIR /usr/src/app
COPY iptech /usr/src/app

RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps && npm cache clean --force

RUN ng build --configuration production

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/docs /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
