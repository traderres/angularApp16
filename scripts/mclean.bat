@Echo off
REM ##########################################################################################
REM # Filename:  mclean.bat
REM #
REM # Purpose:   Build and Deploy the Sync Service to the Amazon ECR
REM #
REM # Design
REM #  1) Generate an AWS ECR token
REM #  2) Split the token into 2 parts (because it's larger than the 1024 char limit for the "for" and "set" windows commands
REM #  3) Combine the tokens and pass them into maven
REM #
REM # Assumptions
REM #  1) The user has run aws configure and has an access key and secret key
REM #  2) The user has tee commands here:  C:\Program Files\Git\usr\bin\tee.exe
REM #      NOTE:  Git comes with them but does not include it in the PATH by default
REM #      Usually, Git for Windows would have these installed here:  C:\Program Files\Git\usr\bin
REM ##########################################################################################

IF "%1"=="dev1" (
  SET buildProfile=-PbuildAndPushSyncService
  SET envName=dev1
  GOTO Compile
)
IF "%1"=="dev2" (
  SET buildProfile=-PbuildAndPushSyncService
  SET envName=dev2
  GOTO Compile
)
IF "%1"=="demo" (
  SET buildProfile=-PbuildAndPushSyncService
  SET envName=demo
  GOTO Compile
)
GOTO Invalid



:Compile
  REM This command grabs the login token and writes it to a temporary file
  ECHO Refreshing AWS ECR token...
  aws ecr get-login-password --region us-east-1 > %TEMP%\ecr_pass.txt

  REM This for loop splits the output from the file into two variables, pass1 and pass2
  REM The token exceeded 1800 characters at the time of creating this script
  setlocal enabledelayedexpansion
  for /F "tokens=* delims=" %%a in (%TEMP%\ecr_pass.txt) do (
    SET str=%%a
    SET pass1=!str:~0,1000!
    SET pass2=!str:~1000,1000!
  )


  del /q %TEMP%\ecr_pass.txt
  del /q %TEMP%\maven-output.txt

  REM This command builds and pushes the image to the appropriate repository
  REM The two password variables from the previous step are combined into the one long password string
  REM Both the username and password for the from and to authorizations must be provided in the following command
  CALL mvn -Djib.to.auth.username=AWS -Djib.to.auth.password=%pass1%%pass2% -Djib.from.auth.username=AWS -Djib.from.auth.password=%pass1%%pass2% -Daws.env.name=%envName% clean package %buildProfile% | "C:\Program Files\Git\usr\bin\tee"  %TEMP%\maven-output.txt

  REM Look for the "BUILD SUCCESS" string in the output file
  findstr /n /c:"BUILD SUCCESS"   %TEMP%\maven-output.txt

  IF %ERRORLEVEL% == 0 goto End1
  GOTO Compile_failed


:Compile_failed
  echo.
  echo.
  echo Your branch failed to compile. It has not been pushed to the %1 AWS environment.
GOTO End1

:Invalid
  ECHO Invalid argument provided. Options are 'dev1', 'dev2', or 'demo'.
GOTO End1

:End1