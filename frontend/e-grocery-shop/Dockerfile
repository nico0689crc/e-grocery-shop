#########################################
#   DEVELOPMENT STAGE
#########################################
FROM node:21-alpine as development

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=development

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

ENV NODE_ENV=production

COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

ARG NEXT_PUBLIC_API_URL

RUN touch .env.production
RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production
RUN cat .env.production

RUN npm run build

USER node

#########################################
#   PRODUCTION STAGE
########################################

FROM node:21-alpine as production

WORKDIR /app

# Install necessary dependencies for production
RUN apk add --no-cache libc6-compat

# Create a user and group to run the app with
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the environment variable for production
ENV NODE_ENV=production

# Copy only the built output from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set the user for running the app
USER nextjs

# Expose the port that Next.js runs on by default (3000)
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]