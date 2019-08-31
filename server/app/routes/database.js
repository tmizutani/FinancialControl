module.exports = function(app) {
    
    var api = app.api.database;
    
    app.route('/database/').get(api.getIncomes);
    app.route('/database/').post(api.insertIncome);
    
}