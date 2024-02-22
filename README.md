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
 - Next, the passwords must be set in a new .env file
 ```
MYSQL_USER=node_user
MYSQL_PASSWORD=nodepassword
SESSION_SECRET=secretkey
```
- Once this has been installed, you can set up and start the docker container
 ``` bash
docker-compose up -d
 ```
- The last thing to do is to start the project
``` bash
npm run start
```
## Author
- [Cyril Tobler](https://github.com/cyriltobler)