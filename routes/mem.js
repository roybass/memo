const client = require('../elastic/client');
const express = require('express');

const router = express.Router();
router.get('/add', (req, res) => {
	
	client.insert(req.query.userId, req.query.text, {length: req.query.text.length})
		.then(() => {
			res.json({success: true});
		})
});

module.exports = router;