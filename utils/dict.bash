#!/bin/bash
git clone --no-checkout --depth 1 https://github.com/takuyaa/kuromoji.js

(
    cd kuromoji.js
    git reset
    git checkout dict/
    mv dict/ ../src
)
rm -rf kuromoji.js/
