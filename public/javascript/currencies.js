function currencyFormat(num) {
    
    if( isNaN(num) || num.length == 0 )
        return 0;
        
    num = parseInt(num);
        
    num = num/100;
    
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}





function formatFieldToCurrency( field ) {
        
    var value = field.val();
 
    value = currencyFormat(value.replace(/\.|\,|[^0-9]/g, ""));
        
    if ( !value )    
        field.val("");
    else
        field.val(value);
    
}





// Just a test for wrapping some functions..
$(document).ready(function(){
    sqlRetrieveIncomes();
});