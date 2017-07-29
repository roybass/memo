const client = require('../server/elastic/client');

function register(app) {

    app.get('/', function (req, res) {
        res.redirect('/index.html');
    });

    app.get('/mem/add', (req, res) => {
        client.insert(req.query.userId, req.query.text, {length: req.query.text.length})
            .then((result) => {
                res.json(result);
            })
    });

    app.get('/mem/search', (req, res) => {
        client.search(req.query.userId, req.query.text)
            .then((result) => {
                res.json(result);
            })
    });

    app.use('/user', function (req, res) {
        res.json(req.user);
    });

}

module.exports = register;
