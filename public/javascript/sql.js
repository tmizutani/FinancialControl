function sqlInsertIncome(income) {
    
    $.post("http://localhost:3000/database", income, function(data) {
        console.log(data.message);
    }).fail( function() {
        console.log("Fail sending data to server");
    });
    
}






function sqlRetrieveIncomes() {

    $.get("http://localhost:3000/database", function(data) {
        RETRIEVE.process(data);
    }).fail( function() {
        console.log("Fail to retrieve list of incomes");
    });
    
}