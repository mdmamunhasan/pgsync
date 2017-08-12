FROM mmnhsn/node8xenial

COPY . /app
WORKDIR /app
#RUN rm -R node_modules/*

RUN npm install

EXPOSE 80

CMD ["pm2", "start", "index.js", "--no-daemon"]