FROM httpd:2.4
LABEL product="Apache2"
LABEL vendor="Technitium"
LABEL email="support@technitium.com"
LABEL project_url="https://httpd.apache.org/"
LABEL github_url="https://github.com/docker-library/repo-info/blob/master/repos/httpd"

COPY ./public-html/ /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/
COPY ./server.crt /usr/local/apache2/conf/
COPY ./server.key /usr/local/apache2/conf/
COPY ./httpd-vhosts.conf /usr/local/apache2/conf/extra/