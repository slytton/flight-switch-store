// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      filename: 'postgres://localhost/flight-switch',
      username: 'flight-switch',
      password: process.env.DB_USER_PASSWORD
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      filename: process.env.DATABASE_URL,
      username: ''
      password: ''
    }
  }
};
