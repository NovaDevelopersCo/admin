#!/bin/bash
echo "go to server directory" 
cd /home/alco/admin/server
echo "stop docker server"
make stop
echo "pull docker server"
make pull
echo "start docker server"
make start

