#########################################
#   BASE STAGE
#########################################

FROM node:21-alpine as base

RUN apk add --no-cache libc6-compat

USER node

#########################################
#   DEVELOPMENT STAGE
#########################################

FROM base as development

WORKDIR /app

ENV NODE_ENV development

COPY --chown=node:node package*.json .

RUN npm ci --legacy-peer-deps 

COPY --chown=node:node . .

# Copy the entrypoint script to a directory owned by the node user
COPY --chown=node:node ./docker-entrypoint.sh /app/

# Make the entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

# CMD ["npm", "run", "start:dev"]

#########################################
#   BUILD STAGE
#########################################

FROM development as build

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

#########################################
#   PRODUCTION STAGE
########################################

FROM build as production

ENV NODE_ENV production

RUN npm ci --legacy-peer-deps && npm cache clean --force

COPY --chown=node:node --from=build /app/dist dist

COPY --chown=node:node --from=build /app/node_modules node_modules

CMD ["node", "dist/main.js"]