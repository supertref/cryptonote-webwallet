FROM nginx:1.15.8-alpine

ARG VERSION=master
ENV VERSION=${VERSION}

LABEL maintainer="supertref@gmail.com"
LABEL source="https://github.com/supertref/cryptonote-webwallet.git"
LABEL version="${VERSION}"

ADD entrypoint.sh /

COPY dist /usr/share/nginx/html

RUN chmod +x /entrypoint.sh
 
WORKDIR /

ENTRYPOINT ["/entrypoint.sh"]
