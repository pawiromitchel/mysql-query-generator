const mysql = require('mysql');
const fs = require('fs');

const databaseCreds = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_testing'
};

const connection = mysql.createConnection(databaseCreds);

connection.query('show tables', function (error, results, fields) {
    if (error) throw error;
    results.map(table => {
        table = table[`Tables_in_${databaseCreds.database}`];

        const selectStatement = `const SELECT = 'select * from ${table}';\n`;
        const updateStatement = `const DELETE = 'delete from ${table} where ${table}_id = id';\n`;
        const exportFunction = `module.exports = {  }`;

        fs.writeFile(`modals/${table}.js`,
            `${selectStatement}${updateStatement}`
            , function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
    })
});

connection.end();
