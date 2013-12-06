
/*
 * GET home page.
 */


module.exports = function(app){

    var home = function(req, res){
      res.render('index', { title: 'Express!' });
    };

    app.get('/', home);
    app.get('/log', home);


    app.get('/status', function (req,res) {
        res.send('server is running...');
    });
}
