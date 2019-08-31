var api = {};

const mariadb = require('mariadb');

// Creates a pool of connections to the specified database
const pool = mariadb.createPool({
     host: "127.0.0.1",
     port: 3306, 
     user:'root', 
     password: 'tm21lkk23', // Can I hide this someway? 
     connectionLimit: 5,
     database: "myfinancesdb"
});

/* Connects into the DB only once, do whatever u need, and disconnect

const connection = mariadb.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: 'tm21lkk23',
    database: "myfinancesdb"
})
.then(conn => {
    
        console.log("connected ! connection id is " + conn.threadId);
        rows = conn.query("create table IF NOT EXISTS incomes ( " +
                          " incomeId int PRIMARY KEY AUTO_INCREMENT, " + 
                          " incomeDescription varchar(50), " +
                          " incomeValue DOUBLE NOT NULL, " +
                          " incomeEntranceDate INT(2) NOT NULL, " + 
                          " incomePeriod varchar(50), " + 
                          " incomeCurrency char(3)" +
                          " ) ");
    
        console.log(rows); //[ {val: 1}, meta: ... ]
    
    })
.catch(err => {
      console.log("not connected due to error: " + err);
});
*/

iniDatabase();

async function iniDatabase() {
    
    let conn;
    
    try {
        
        // Has to have the "await" because it could get some time to 
        // retrieve a connection from the pool.
        conn = await pool.getConnection();  
        
        var rows = conn.query("create table IF NOT EXISTS incomes ( " +
                          " ID int PRIMARY KEY AUTO_INCREMENT, " + 
                          " description varchar(50), " +
                          " ammount DOUBLE NOT NULL, " +
                          " entranceDate INT(2) NOT NULL, " + 
                          " period varchar(50), " + 
                          " currency char(3)" +
                          " ) ");
    
        console.log(rows); 
        
    } catch (err) {
        
        console.log(err);
        
    } finally {
        if (conn) 
            return conn.end();
    }
    
}





async function insertIncomes(income) {
  
    let conn;
    
    try {
        /* dumps for tests
        console.log(income.description);
        console.log(income.ammount);
        console.log(income.entranceDate);
        console.log(income.periodicity);
        console.log(income.currency);
        
        console.log("chegou requisicao");
        */
        conn = await pool.getConnection();
                  
        const res = await conn.query(
            "INSERT INTO incomes values (?, ?, ?, ?, ?, ?)", 
            [
                null, 
                income.description, 
                income.ammount,
                income.entranceDate,
                income.periodicity,
                income.currency
            ]
        );
        
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        
        console.log(err);
        
    } finally {
        
            if (conn) 
            return conn.end();
    }
    
}



async function getIncomes() {
    
    let conn;
    let rows;
    
    try {
    
    // Has to have the "await" because it could get some time to 
    // retrieve a connection from the pool.
    conn = await pool.getConnection();  

    rows = await conn.query("select description, ammount, entranceDate, periodicity, currency from incomes");
    
    } catch( err ) {
        
        console.log(err);
        
    } finally {
        
        if( conn )
            conn.end();            
    }
    
    return rows;
}






async function getTotalIncomes() {
    
    let conn;
    let rows;
    
    try {
    
    // Has to have the "await" because it could get some time to 
    // retrieve a connection from the pool.
    conn = await pool.getConnection();  

    rows = await conn.query("select sum(ammount) as total from incomes");
    
    } catch( err ) {
        
        console.log(err);
        
    } finally {
        
        if( conn )
            conn.end();            
    }
    
    return rows;
    
}





function calcPercentage(incomesList, total) {
    
    var percentages = [];
    var i = 0;    
    var percentage = 0;
    
    for( i=0; i<incomesList.length; i++ ) {
        
        console.log("Valor = " + (parseFloat(incomesList[i].ammount)));
        console.log("Total calc = " + parseFloat(total));
        
        percentage = ((parseFloat(incomesList[i].ammount)*100)/parseFloat(total)).toFixed(2);
        
        console.log("Nova porcentagem = " + percentage);
        
        percentages.push(percentage);        
    }
        
    return percentages;   
    
}






api.getIncomes = async function (req, res) {
    
    var incomesData = {};
    var percentages = {};
    var rows;
    var totalIncomes;
    
    rows = await getIncomes();
        
    if( rows.length == 0 )
        return 0;
        
    totalIncomes = await getTotalIncomes();
    
    console.log("Total calculado = " + totalIncomes[0].total);
    
    percentages = calcPercentage(rows, totalIncomes[0].total);
    
    incomesData = {
        incomesList: rows,
        percentageList: percentages
     };
    
    res.json(incomesData);
}







api.insertIncome = function(req, res) {
    
    try {
        
        insertIncomes(req.body.income);
        
        res.json({message: "Success!"});
        
    }catch(e) {
        console.log(e.message);
    }    
    
}

module.exports = api;
