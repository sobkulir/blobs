#!/bin/bash

git checkout --quiet master
something_changed=$(git diff-index --exit-code --ignore-submodules HEAD)
if [ -n "$something_changed" ]
then
    echo >&2 "Master has some changes, I cannot deploy."
    exit 1
fi

commit_id=$(git show-ref --head | head -c6)
git checkout -B gh-pages
git checkout master -- src

mkdir $commit_id
cp -r src $commit_id
mv src/css css
mv src/js js
mv src/index.html index.html
rm -rf src

touch .nojekyll
date > version.txt

git add -A .
git commit -m "deploy"
git push -f origin gh-pages

git checkout master
git clean -df