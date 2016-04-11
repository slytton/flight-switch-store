To install the app...

```
touch .env
npm install

// Create the database
createdb flight-switch

// Add cookie session keys.
SESSIONKEY1=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env
SESSIONKEY2=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env
SESSIONKEY3=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env

// Add secret for bcrypt
echo SECRET=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env

and take out line 26 with and replace it with
app.use(cookieParser(process.env.SECRET));

ENVIRONMENT=development >> .env
DB_USER_PASSWORD=[your password] >> .env

```
