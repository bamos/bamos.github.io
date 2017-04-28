#!/bin/bash

set -x -e

#bower install

rm -rf vendor
mkdir -p vendor/{css,fonts,js}

cp -r bower_components/bootstrap/dist/js/* vendor/js
cp -r bower_components/bootstrap/dist/fonts/* vendor/fonts
wget -P vendor/css https://bootswatch.com/readable/bootstrap.min.css
wget -P vendor/css https://bootswatch.com/readable/bootstrap.css

cp -r bower_components/academicons/css/* vendor/css
cp -r bower_components/academicons/fonts/* vendor/fonts
cp -r bower_components/font-awesome/* vendor

cp -r bower_components/pygments/css vendor/pygments

cp bower_components/jquery/dist/* vendor/js

cp bower_components/anchor-js/anchor.min.js vendor/js
cp bower_components/jquery.toc/jquery.toc.js vendor/js
