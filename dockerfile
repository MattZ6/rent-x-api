FROM node:14.19.3-alpine

# Set non-root user and expose port
USER node
EXPOSE ${PORT}

WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

RUN yarn prisma generate

CMD [ "yarn", "dev" ]
