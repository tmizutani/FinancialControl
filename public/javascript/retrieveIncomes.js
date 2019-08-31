var RETRIEVE = (function(){

    var retrieve = {};
    
    retrieve.processIncomesList = function(incomes) {

        var listSize = incomes.incomesList.length;
        var i = 0;

        $(incomes.incomesList).each(function() {

            INCOME.add(this);
            console.log(incomes.percentageList[i]);            
            INCOME.addIncomeList(this, incomes.percentageList[i]);
            
            i++;    
        });
    };

    
    return {
        process: retrieve.processIncomesList       
    };

})();