FROM node:22.14-alpine3.21 as build

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install --force && npm cache clean --force

RUN ng build --configuration production

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/docs /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
