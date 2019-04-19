FROM node:10.15.1

RUN useradd --user-group --create-home --shell /bin/false app &&\
    npm install --global npm@6.4.1

ENV HOME=/home/app

COPY package.json $HOME/desafio/

RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/desafio

RUN npm cache clean && npm install

USER root
COPY . $HOME/desafio
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]