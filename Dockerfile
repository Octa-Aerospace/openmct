FROM ubuntu:22.04

RUN apt-get update

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v16.19.1
RUN mkdir -p /usr/local/nvm && apt-get update && echo "y" | apt-get install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

RUN npm install -g npm@9.8.1

RUN apt-get install -y git

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]