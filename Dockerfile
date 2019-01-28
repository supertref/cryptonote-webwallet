FROM nginx:1.13-alpine

ARG VERSION=master
ENV VERSION=${VERSION}

LABEL maintainer="gleisson.assis@gmail.com"
LABEL source="https://github.com/gleissonassis/cryptonote-webwallet.git"
LABEL version="${VERSION}"

ADD entrypoint.sh /

COPY dist /usr/share/nginx/html

FROM alpine:3.8
RUN apk add --update --no-cache openssl \
 && chmod +x /entrypoint.sh

WORKDIR /

ENTRYPOINT ["/entrypoint.sh"]
