#! /bin/sh

##
# This file is run as the vagrant user and sets up local project
# settings; none of the commands should need root access
##

echo -e "\n================================="
echo "Bootstrapping project $PROJECT_NAME"
echo -e "=================================\n"

echo -e "\n================================="
echo "Making virtualenv $PROJECT_NAME"
echo -e "=================================\n"
mkvirtualenv -p /usr/bin/python3 $PROJECT_NAME
workon $PROJECT_NAME


echo -e "\n================================="
echo "Install project python dependencies"
echo -e "=================================\n"
pip install -r requirements/dev.txt


echo -e "\n================================="
echo "Install NodeJS dependencies"
echo -e "=================================\n"
npm install
