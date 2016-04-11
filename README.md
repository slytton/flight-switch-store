To install the app...

```
touch .env
npm install

// Create the database
createdb flight-switch

// Add cookie session keys.
echo SESSIONKEY1=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env
echo SESSIONKEY2=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env
echo SESSIONKEY3=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env

ENVIRONMENT=development >> .env
DB_USER_PASSWORD=[your password] >> .env

```
