# Chessnovum

XYZ


## Installation

- First, the project must be cloned
``` bash
   git clone https://github.com/cyriltobler/Chessnovum.git
 ```

- The second step is to install all required packages
 ``` bash
    npm i
 ```
 - Next, the passwords must be set in the .env 
 ```
MYSQL_USER=node_user
MYSQL_PASSWORD=nodepassword
SESSION_SECRET=secretkey
```
- Once this has been installed, you can set up and start the docker container
 ``` bash
    docker-composeup -d
 ```
- The last thing to do is to start the project
``` bash
    npm run start
```