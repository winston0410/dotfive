FROM node:16-alpine as base
WORKDIR /app
COPY ./. ./.

FROM base as production
ENV NODE_ENV=production
RUN npm install --frozen-lockfile --production=false
RUN npm run build
COPY --chown=node:node . .
USER node
CMD npm run preview -- --host 0.0.0.0
