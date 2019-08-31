function applyFilter(filter, incomeFieldValue) {
    
    if( filter.val() != 0 ) {

        if( incomeFieldValue.toUpperCase() != filter.text().toUpperCase() )
            return true;        
    }
    
    return false;    
}





function validateIncome(income) {
    
    var filterForm = $(".filter__form");
    var filterDescription = filterForm.find("[name=filterDescription] option:selected")
    var filterDate = filterForm.find("[name=filterDate] option:selected");    
    var filterPeriod = filterForm.find("[name=filterPeriod] option:selected");
    var filterCurrency = filterForm.find("[name=filterCurrency] option:selected");
    
    var hide = false;
        
    hide = applyFilter(filterDescription, income.find(".info-description").text());

    if( hide )
        return true;
    else
    {
        hide = applyFilter(filterDate, income.find(".info-date").text());

        if( hide )             
            return true;
        else 
        {
            hide = applyFilter(filterPeriod, income.find(".info-periodicity").text());

            if( hide ) 
                return true;
            else
                hide = applyFilter(filterCurrency, income.find(".info-currency").text());        
        }
    }

    return hide;
}





function hideIncome(income) {
    income.addClass("incomeInvalid");
}





function showIncome(income) {    
    income.removeClass("incomeInvalid");    
}





function filterTable() {
  
    try {

        var tableIncomes = document.querySelector(".table-incomes");
        var incomesList = tableIncomes.querySelectorAll(".income");
        

        incomesList.forEach(function(income) {

            if( validateIncome($(income)) )         
                hideIncome($(income));
            else 
                showIncome($(income));

        });
        
        
    } catch(e) {
        console.log("filterTable: " + e.message);
    }
}





function addFilterOption(income) {
    
    var filterField = $("#filterDescription");
    addNewFilterOption(filterField, income.description);
    
    filterField = $("#filterDate");    
    addNewFilterOption(filterField, income.entranceDate);
    
    filterField = $("#filterPeriod");
    addNewFilterOption(filterField, income.periodicity);
    
    filterField = $("#filterCurrency");
    addNewFilterOption(filterField, income.currency);
    
}






function resetFilterForm() {
    
    var filterForm = $(".filter__form");
    
    filterForm.find("[name=filterDescription]").prop("selectedIndex", 0);
    filterForm.find("[name=filterDate]").prop("selectedIndex", 0);
    filterForm.find("[name=filterPeriod]").prop("selectedIndex", 0);
    filterForm.find("[name=filterCurrency]").prop("selectedIndex", 0);   
    
}





function createNewOption(optionValue, optionText) {
    
    var newOption = $("<option></option>"); //document.createElement("option");
        
    $(newOption).val(optionValue);
    $(newOption).text(optionText);
    
    return newOption;
    
}






function filterHasOption(filterField, optionText) {
    
    var filterOptions = filterField.prop('options');

    for( i=0; i<filterOptions.length; i++ ) {        
        
        if( filterOptions[i].text.toUpperCase() == optionText.toUpperCase() )        
            return true;        
    }

    return false;
}







function addNewFilterOption(filterField, optionText) {
    
    var newOpt;
    
    if( !filterHasOption(filterField, optionText) ) {    
        
        newOpt = createNewOption(filterField.length, optionText);
                
        filterField.append($(newOpt));   
        
    }
    
}






$(".filter-button").on('click', function() {
    
    // To use this function (slideToggle), need to use the min or the uncompressed version
    // of jquery its not implemented on the slim version
    $(".filter__form").slideToggle(300);
    
});





$("#buttonApplyFilter").on('click', function() {
    filterTable();    
});





$("#buttonResetFilter").on('click', function() {
    resetFilterForm();
    filterTable();
});