# AngularApp16 / Lesson 9 / Deploy to AWS

<pre>
Assumptions
 A) You have Maven 3.6.3 installed      (the frontend-maven-plugin requires Maven 3.6.0 or greater)
    [see learnMaven / howToInstallMaven_3.6.3.OnCentOS.txt]

 B) You have NVM installed
    [see learnNode / howToInstallNodeVersionManager.txt]

 C) You have Java 17 JDK installed
    [see learnJava / howToInstallJava_OpenJdk_OnCentos8.txt]


Procedures
  1. Install or upgrade Node and the Angular CLI
     a. Use NVM to install Node v18.17.0            # Angular 16.2 requires node 18.10.0 or later
        unix> nvm install 18.17.0
        unix> nvm alias default 18.17.0             # Set the default version in your shell to this version
    
    
     b. Verify that Node is v18.17.0 / npm is 9.6.7
        1) Open a new terminal
    
        2) Verify that node is 18.17.0
           unix> node -v
           v18.17.0
    
        3) Verify that NPM is 9.6.7
           unix> npm -v
           9.6.7
    
    
     c. Install the Angular CLI 16.2
        1) List npm global packages
           unix> npm list -g --depth 0
            ├── corepack@0.19.0
            └── npm@9.6.7
    
        2) Uninstall the previous version of your Angular CLI
           unix> npm uninstall @angular/cli        # uninstall the local angular CLI
           unix> npm uninstall -g @angular/cli     # uninstall the global angular CLI
    
        3) Install Angular CLI 16.2.2
           unix> npm install -g @angular/cli@16.2.2
    
        4) Verify the versions are good
           unix> ng version
    
                       _                      _                 ____ _     ___
                      / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
                     / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
                    / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
                   /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                                  |___/
    
                  Angular CLI: 16.2.2
                  Node: 18.17.0
                  Package Manager: npm 9.6.7
                  OS: linux x64
    
                  Angular: undefined
                  ...
    
                  Package                      Version
                  ------------------------------------------------------
                  @angular-devkit/architect    0.1602.2 (cli-only)
                  @angular-devkit/core         16.2.2 (cli-only)
                  @angular-devkit/schematics   16.2.2 (cli-only)
                  @schematics/angular          16.2.2 (cli-only)
    
        5) List npm global packages
           unix> npm list -g --depth 0
            ├── @angular/cli@16.2.2         <-- Verify that you see Angular CLI 16.2.2
            ├── corepack@0.18.0
            └── npm@9.6.7


 2. Compile & Run the Web App
    a. Clone the project
       terminal> git clone https://github.com/traderres/angularApp16.git
 
    b. Checkout the correct branch
       terminal> cd angularApp16
       terminal> git checkout lesson9/deploy-to-aws

    c. Initialize the local postgres database by following the steps in docs/howToInitializePostgresDatabase.dev.txt
    
    d. Build the project
       terminal> mvn clean package -Pprod
    
    e. Nuke the database and rebuild ElasticSearch 
       terminal> java -Dapp.datasource.flyway-clean-on-startup=TRUE -jar ./sync-service/target/sync-service-1.0-SNAPSHOT-exec.jar
       
    f. Run the webapp
       terminal> java -jar ./backend/target/backend-1.0-SNAPSHOT-exec.jar 
       
    g. Connect to the webapp listening on port 8080
       Go to http://localhost:8080/app16
    
    h. Stop the webapp by pressing Control-C


 3. Setup Debugging in IntelliJ Ultimate
    a. Open the project in IntelliJ
    b. <a href="https://github.com/traderres/webClass/blob/master/learnAngular/lessons_Angular16/howToDebugExistingWebapp.txt">Setup debugging (so you can debug TypeScript and Java code)</a>


 4. Install AWS CLI
    See https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
    a. Install the AWS CLI 

       Install the AWS CLI for Linux
       unix> curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
       unix> unzip awscliv2.zip
       unix> sudo ./aws/install
    
       *OR*
    
       Install the AWS CLI for Windows
       terminal> msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
    

    b. Verify the AWS CLI is installed
       unix> aws --version
    
       You should see something like this:
               aws-cli/2.22.10 Python/3.12.6 Linux/5.14.0-427.42.1.el9_4.x86_64 exe/x86_64.rocky.9
    

 5. Setup AWS Credentials
    a. Open the downloaded CSV file (dev.user_accessKeys.csv) in a text editor
		   -- You should see a 2 line file

        	Access key ID,Secret access key
        	ABCDEFGHIJKLMN,123456789123456789/123456789456123
				^                        ^        ^
				|                        |        |
			Access Key Id          AWS Secret Access Key
    
    b. Setup AWS credentials
       unix> aws configure

		  AWS Access Key ID [None]:         <ENTER TEXT BEFORE THE COMMA (on line 2 of the CSV file)
		  AWS Secret Access Key [None]:     <ENTER TEXT AFTER  THE COMMA (on line 2 of the CSV file)
		  Default region name [None]:       If using aws-gov-cloud, then probably use your region   -- e.g., us-gov-west-1
		                                    If using aws-residential, then probably use your region -- e.g., us-east-1
		  Default output format [None]:     json
 

 6. Use the scripts to build and push the webapp image up to the Amazon ECR
    a. Build and push the webapp image to the Amazon ECR
       In Windows
       Terminal> scripts\m.bat dev1

       *OR*

       In Unix
       unix> chmod u+x  ./scripts/m.sh
       unix> ./scripts/m.sh dev1


    b. Build and push the sync-service image to the Amazon ECR
       In Windows
       Terminal> scripts\mclean.bat dev1

       *OR*

       In Unix
       unix> chmod u+x  ./scripts/mclean.sh
       unix> ./scripts/mclean.sh dev1
   

</pre>
