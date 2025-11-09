FROM node:latest

RUN mkdir -p /opt/ui
WORKDIR /opt/ui
RUN adduser --disabled-password ui

COPY ./ .

RUN chown -R ui:ui /opt/ui
USER ui
RUN npm install
EXPOSE 8080

# docker-compose environment overrides Dockerfile ENV statements.
# Dockerfile ENV statements for testing. Use --network=host with docker run.
ENV API_PROT=http
ENV API_HOST=localhost
#ENV API_HOST=apiFBMP
ENV API_PORT=4000

ENTRYPOINT ["node","server.js"]

USER ui
