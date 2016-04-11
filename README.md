To install the app...

```
touch .env
npm install

// Create the database
createdb flight-switch

// Create the database user
createuser -P flight-switch

// Add cookie session keys.
SESSIONKEY1=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env
SESSIONKEY2=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env
SESSIONKEY3=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env

ENVIRONMENT=development >> .env
DB_USER_PASSWORD=[your password] >> .env

```
