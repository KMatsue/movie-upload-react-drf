FROM python:3.11

USER root

ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get -y install --reinstall ca-certificates && \
    apt-get -y install software-properties-common && \
    apt-get install -y vim less && \
    pip install --upgrade pip 

WORKDIR /root

COPY requirements.txt /root/

RUN pip install -r /root/requirements.txt