# README #

### What is this repository for? ###

![alt text](trelloClone.gif)

This is a Trello Mockup implemented using React, SCSS, Express, and MySQL.

#### 1. Clone repo ###

```
$ git clone git@github.com:jknpg/trello-clone.git
```

#### 2. Install yarn package manager ###

https://yarnpkg.com/en/docs/install

#### 3. Download and Configure MySQL###

Download Link: https://dev.mysql.com/downloads/mysql/

Your DB configuration must look like this. 

```
//.env
DB_USERNAME='root'
DB_PASSWORD='root'
DB_HOST='localhost'
DB_NAME='trello-devdb'
DB_DIALECT: 'mysql'
```

#### 4. Initialize DB: Migrate and Seed  ###

```
yarn install
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all

```

#### 5. Start a Webpack Server ###

```
$ yarn start
```


#### 6. Start an Express Server ###
```
$ yarn api 
```


##### Who do I talk to? ####
* Jake Kim - jakejooyoung@gmail.com