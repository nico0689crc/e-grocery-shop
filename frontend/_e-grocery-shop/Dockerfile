#########################################
#   DEVELOPMENT STAGE
#########################################
FROM node:21-alpine as development

RUN apk add --no-cache libc6-compat

ENV NODE_ENV development

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci --legacy-peer-deps 

RUN chown -R node:node /app/node_modules

COPY --chown=node:node . .

COPY --chown=node:node ./docker-entrypoint.sh /app/

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

USER node

CMD ["npm", "run", "dev"]

#########################################
#   BUILD STAGE
#########################################

FROM node:21-alpine as builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

ARG NEXT_PUBLIC_BACKEND_HOST_DOMAIN
ARG NEXT_PUBLIC_FRONTEND_HOST_DOMAIN
ARG NEXT_PUBLIC_USER
ARG NEXT_PUBLIC_PASSWORD

RUN touch .env.production
RUN echo "NEXT_PUBLIC_BACKEND_HOST_DOMAIN=$NEXT_PUBLIC_BACKEND_HOST_DOMAIN" >> .env.production
RUN echo "NEXT_PUBLIC_FRONTEND_HOST_DOMAIN=$NEXT_PUBLIC_FRONTEND_HOST_DOMAIN" >> .env.production
RUN cat .env.production

RUN npm run build

USER node

#########################################
#   PRODUCTION STAGE
########################################

FROM node:21-alpine as production

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]