const client = require('../elastic/client');
const express = require('express');

const router = express.Router();
router.get('/add', (req, res) => {
	client.insert(req.query.userId, req.query.text, {length: req.query.text.length})
		.then((result) => {
			res.json(result);
		})
});

router.get('/search', (req, res) => {
	client.search(req.query.userId, req.query.text)
	  .then((result) => {
	  	res.json(result);
	  })
});

module.exports = router;