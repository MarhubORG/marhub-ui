# build environment
FROM node:12.16.3-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn add react-scripts@3.4.1 -g
COPY . ./
CMD ["yarn", "run", "build"]
# RUN yarn run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=0 /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]