const es = require('elasticsearch');
const logger = require('../server/logger').create('es-client');

var client = new es.Client({
  host: 'http://104.197.160.126/elasticsearch/',
  log: 'trace'
});

class Client {

	insert(userId, text, metadata) {
		return client.index({
		  index: 'userdata',
		  type: 'mem',
		  body: {
		    title: 'text',
		    userId: userId,
		    metadata: metadata,
		    published: true,
		  }
		});
	}
}

module.exports = new Client();