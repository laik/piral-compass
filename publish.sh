#!/bin/bash

declare -a pilets=("")

for pilet in "${pilets[@]}";
do
    echo ${pilet};
    cd ${pilet};
    yarn upload;
    rm *.tgz
    cd ..
done
