module.exports = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./db/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    }
}