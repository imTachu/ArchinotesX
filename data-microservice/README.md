## The ArchinotesX microservice template

### What's this?
This is a minimal Node.js microservice that will expose always two GET endpoints on port 8080:  
`/api/<TABLE>`  
`/api/<TABLE>/:id`

### Environment variables
`DATABASE_URL=postgres://<username>:<password>@<host>:5432/<dbname>`  
`TABLE=<The table from your db that will be queried>`

### Docker
This 'application' is hosted in Docker Hub as a public repository and can be used with these commands:  
`docker pull imtachu/data-microservice`  
`docker build -t imtachu/data-microservice .`  
`docker run -p 49160:8080 -d -e DATABASE_URL='postgres://archinotesx:archinotesx@archinotesx.c9a6xekrmqk7.us-east-1.rds.amazonaws.com:5432/archinotesx' -e TABLE='steps' imtachu/data-microservice`

Then test `http://localhost:49160/api/<TABLE>` and you'll see your results.

**Note:** If you're using docker-toolbox, then you might need to use `docker-machine ip default` to get the right IP.
