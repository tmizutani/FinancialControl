var INCOME = (function() {
             
    // Cria o objeto em si
    var income = {};    
    
    
    // if you dont refer this function on the return, it will become like
    // a private method of this object. NICE! 
    var createIncomeData = function(data, className) {

        var incomeData = document.createElement("td");

        incomeData.classList.add(className);
        incomeData.textContent = data;

        return incomeData;    

    };
    
    
    // Adiciona funções e/ou propriedades, variaveis etc..
    income.createNewIncome = function (newIncome) {
    
        var incomeTr = document.createElement("tr");

        incomeTr.classList.add("income");

        incomeTr.appendChild(createIncomeData(newIncome.description, "info-description"));
        incomeTr.appendChild(createIncomeData(newIncome.ammount, "info-ammount"));
        incomeTr.appendChild(createIncomeData(newIncome.entranceDate, "info-date"));
        incomeTr.appendChild(createIncomeData(newIncome.periodicity, "info-periodicity"));
        incomeTr.appendChild(createIncomeData(newIncome.currency, "info-currency"));

        $("#table-incomes-body").append(incomeTr);
    
    };
    
    
    
    var createMyIncomeData = function (data, className) {
        
        var newData = $("<div></div>");
        
        newData.addClass(className);
        newData.text(data);
        
        return newData;        
        
    };
    
    
    income.insertMyIncomesList = function(income, percentage) {
        
        var newItem = $("<li></li>");
                
        newItem.addClass("incomes-item");
        newItem.append(createMyIncomeData(percentage + " %", "income-percentage"));
        newItem.append(createMyIncomeData(income.description, "income-name"));
        newItem.append(createMyIncomeData(income.ammount, "income-value"));
        
        $(".incomes-list").append(newItem);
        
        
    }
    
    
    // Desta forma, alem de controlar aquilo que sera retornado, 
    // posso mascarar os dados, por exemplo, em vez de acessar por .createNewIncome,
    // acesso somente via .add;
    
    return {
        add: income.createNewIncome, // By doing this, "createNewIncome" turns into a public function of this object        
        addIncomeList: income.insertMyIncomesList
    };             
    
    
    // Retorno o objeto inteiro... e aí para acessar, tem que acessar
    // .createNewIncome
    // .teste por exemplo
   // return income;
             
})();







function clearFormNewIncome() {
    $(".new-income-form").trigger("reset");    
}






$(".button-add-income").click(function(event) {
    
    var formNewIncome = $(".new-income-form");
    
    var income = {
        description : formNewIncome.find("[name=description]").val(),
        ammount : formNewIncome.find("[name=ammount]").val().replace(/,/g,''),
        entranceDate : formNewIncome.find("[name=entrance-date]").val(),
        periodicity : formNewIncome.find("[name=periodicity] option:selected").text(), 
        currency : formNewIncome.find("[name=currencies]").val()        
    };
    
    if( $(".new-income-form")[0].checkValidity() )
    {
        event.preventDefault(); // Descomentar isso quando for fazer o envio pro servidor
        //createNewIncome(income);
        INCOME.add(income);
        addFilterOption(income);        
        clearFormNewIncome();
        
        var dados = {
            income: income
        }
        
        sqlInsertIncome(dados);
        
    }
        
});







$("#ammountField").on("input", function() {
   
    formatFieldToCurrency($(this));        
    
});
