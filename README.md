# dongbang
A service to check if SPARCS Members are resident in the Club Room.

### Running the development server
To run the development server, `Meteor` needs to be pre-installed. 

You also need to set the following enviroment variables:
> `MEMVERS_ROOT` The API root of *Memvers*
> 
> `MEMVERS_CREDENTIAL_UN`, `MEMVERS_CREDENTIALS_PW` Username and password of a SPARCS LDAP account 
> that have access to the *Memvers* service

To run the server, 
```bash
cd app
meteor npm install
meteor run
```

### Building
```bash
docker-compose up
```
