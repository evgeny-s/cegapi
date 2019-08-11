# How to start

### Create or import database:
```bash
sudo -u postgres psql -c "create database \"ceg\";"
sudo -u postgres psql -c "create user \"ceg\" with encrypted password 'ceg';"
sudo -u postgres psql -c "grant all privileges on database \"ceg\" to \"ceg\";"
```

### Install packages
```bash
nvm exec npm i
nvm exec npm i -g sequelize-cli
```

### Run the project
```bash
nvm exec npm run start
```
