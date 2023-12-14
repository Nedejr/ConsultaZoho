import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

// config for your database
const config = {
    
    user: process.env.SQL_SERVER_USER,
    password: process.env.SQL_SERVER_PASS,
    database: process.env.SQL_SERVER_DATABASE,
    server: process.env.SQL_SERVER_SERVER,
    encrypt:false,
    trustServerCertificate:true,

};

// connect to your database
sql.connect(config, function (err) {
    
    if (err) console.log(err);

    // create Request object
        const request = new sql.Request();
           
    // query to the database and get the records
    request.query(process.env.SQL_SERVER_QUERY, function (err, recordset) {
            
        if (err) console.log(err)

        // send records as a response
        let registros = [] 
               
        recordset.recordset.map(e => {
            registros.push(e)
        });
        
        console.log(registros)
        console.log("quantidade: " +  registros.length)
           
    });
});


