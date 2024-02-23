# Chessnovum
ChessNovum is an innovative chess application that seamlessly combines the classic game of chess with modern online gaming features. With ChessNovum, users can enjoy the timeless strategy game online and compete with opponents from all over the world. 

## Installation
- First, the project must be cloned

``` bash
git  clone  https://github.com/cyriltobler/Chessnovum.git
```
- The second step is to install all required packages

``` bash
npm  i
```
- Next, the passwords must be set in the .env
```
MYSQL_USER=node_user

MYSQL_PASSWORD=nodepassword

SESSION_SECRET=secretkey
```
- Once this has been installed, you can set up and start the docker container
``` bash
docker-compose up  -d
```
**However, make sure that the database login data is correct. It may be that a few adjustments need to be made in /app/db/db-config.js**

- The last thing to do is to start the project
``` bash
npm  run  start
```

## Runtime
After successful implementation and startup, the chess application can be reached on the localhost on port 3000 and phpMyAdmin on port 8081
- [Chessnovum](http://localhost:3000)
- [phpMyAdmin](http://localhost:8081)

## Author

- [Cyril Tobler](https://github.com/cyriltobler)
```