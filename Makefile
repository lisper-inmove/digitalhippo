shell := /bin/bash

build:
	yarn build

start:
	yarn bgstart

bd: build # build docker
	sudo docker build -t mh.com:8890/test/digitalhippo:v1.0 .
	sudo docker push mh.com:8890/test/digitalhippo:v1.0

rd: # restart docker
	sudo docker stop digitalhippo_v1
	sudo docker rm digitalhippo_v1
	sudo docker run --restart always -d --name digitalhippo_v1 -p 9600:3000 mh.com:8890/test/digitalhippo:v1.0

sd:
	sudo docker run --restart always -d --name digitalhippo_v1 -p 9600:3000 mh.com:8890/test/digitalhippo:v1.0
