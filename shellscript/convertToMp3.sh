#!/bin/bash
#sudo apt-get install gpac to use MP4Box
date=$(date '+%Y-%m-%d')

cd "/mnt/alice_nas/$date"

files=$(ls | grep "\.h264$")

for file in $files
do
    if [ ${file: -5} == ".h264" ];
    then
        MP4Box -add $file  "${file:0:15}.mp4"
        rm $file
    fi
done