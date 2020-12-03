#!/usr/bin/env bash -e

git subtree split --prefix dist/demo -b temp
git push -f heroku temp:master
git branch -D temp
