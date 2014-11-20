#! /bin/sh

##
# This file is run as the root user and installs the required
# files
##

PROJET_NAME=heimdall
PROJECT_HOME=/home/vagrant/heimdall

cd $PROJECT_HOME

# Install apt requirements
apt-get update -y


echo -e "\n================================="
echo "Installing System Base requirements"
echo -e "=================================\n"
apt-get install -y git tree


echo -e "\n================================="
echo "Installing Python requirements"
echo -e "=================================\n"
apt-get install -y build-essential libpq-dev python3-pip


echo -e "\n================================="
echo "Installing NodeJS requirements"
echo -e "=================================\n"
apt-get install -y nodejs nodejs-legacy npm


echo -e "\n================================="
echo "Setting up virtualenv"
echo -e "=================================\n"
pip3 install virtualenv
pip3 install virtualenvwrapper


echo -e "\n================================="
echo "Install Gulp globally"
echo -e "=================================\n"
npm install -g gulp


# link our bashrc if this is the first time we're provisioning
echo -e "\n================================="
echo "Linking our bash config file"
echo -e "=================================\n"
if [ -f /provisioned ]
then
    echo "Skipping.. Already done once"
else
    echo ". $PROJECT_HOME/_bashrc" >> /home/vagrant/.bashrc
    echo "Linked"
fi


# keep a file so we know if we've already provisioned once
touch /provisioned
