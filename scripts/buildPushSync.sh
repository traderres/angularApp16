#!/bin/bash
##########################################################################################################
# Filename:  buildPushSync.sh
##########################################################################################################
# Purpose:
#   Build and push the Sync Service image to the Amazon ECR
#
# Design
#   1. Get the user's AWS token in a variable
#   2. Pass-in the AWS token into the mvn command (so that the jib maven plugin uses it to push up images to our Amazon ECR)
#   3. Run the mvn command with these profiles:  "prod" and "buildAndPushSyncService"
#      unix> mvn -Djib.to.auth.username=AWS -Djib.to.auth.password=$PASSWORD -Djib.from.auth.username=AWS -Djib.from.auth.password=$PASSWORD -Daws.env.name=dev clean package -Pprod -PbuildAndPushSyncService
#
# Usage:
#    unix> chmod u+x scripts/buildPushSync.sh               # Make the script executable
#    unix> scripts/buildPushSync.sh dev1
##########################################################################################################

if [ "$1" != "dev1" ] && [ "$1" != "dev2" ] && [ "$1" != "demo" ]; then
  echo -e "USAGE: m.sh <env name>    Possible values are 'dev1', 'dev2', or 'demo'."
  exit 1
fi


# Refresh the user's AWS token and store it in a variable
echo -e "\nRefreshing your AWS token with this command"
echo -e "\taws ecr get-login-password --region us-east-1\n"
export PASSWORD=`aws ecr get-login-password --region us-east-1`

echo -e "Running Maven with these profiles:  prod and buildAndPushSyncService  env is $1"
echo -e "\tmvn -Djib.to.auth.username=AWS -Djib.to.auth.password=\$PASSWORD -Djib.from.auth.username=AWS -Djib.from.auth.password=\$PASSWORD clean package -PbuildAndPushSyncService\n"
mvn -Djib.to.auth.username=AWS -Djib.to.auth.password=$PASSWORD -Djib.from.auth.username=AWS -Djib.from.auth.password=$PASSWORD -Daws.env.name=$1  clean package -PbuildAndPushSyncService | tee /tmp/output.txt

grep "BUILD SUCCESS" /tmp/output.txt

if [ $? -ne 0 ]; then
    # The last command had a problem.
    echo -e "\nCritical Error -- the code did not compile"
    exit 1
fi

echo "Successfully built and pushed the image up to the ECR"
exit 0