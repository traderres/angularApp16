# AngularApp16 / Lesson 2 / Setup empty header, navbar

```
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
       unix> git clone https://github.com/traderres/angularApp16.git
      
    b. Build the project
       unix> cd angularApp16
       unix> git checkout lesson2/setup-header-and-navbar
       unix> mvn clean package -Pprod
       
    c. Run the webapp
       unix> java -jar ./backend/target/backend-1.0-SNAPSHOT-exec.jar
       
    d. Connect to the webapp listening on port 8080
       Go to http://localhost:8080/app16
    
    e. Stop the webapp by pressing Control-C


```
