# FROMに指定の環境変数に反映する
ARG GCP_REGION
ARG GCP_PROJECT
ARG BASE_AR_REPO_NAME

FROM ${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/${BASE_AR_REPO_NAME}/node:20-bookworm-slim AS build

# RUN yarn config set registryに指定の環境変数に反映する
ARG GCP_REGION
ARG GCP_PROJECT
ARG ARTIFACT_REGISTRY_JS_REPO_NAME
ARG APP_ENV
WORKDIR /app

COPY package.json yarn.lock .npmrc ./

RUN yarn config set registry "https://${GCP_REGION}-npm.pkg.dev/${GCP_PROJECT}/${ARTIFACT_REGISTRY_JS_REPO_NAME}"
RUN NPM_CONFIG_USERCONFIG=./.npmrc yarn install --frozen-lockfile --prod

COPY tsconfig.json ./
COPY public ./public
COPY src ./src
COPY .env.${APP_ENV} ./
RUN yarn build:${APP_ENV} --optimize-minimize


FROM ${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/${BASE_AR_REPO_NAME}/nginx:1.26-alpine-slim

COPY --from=build /app/build /usr/share/nginx/html

RUN sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
RUN sed -i '/location \/ {/a try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
