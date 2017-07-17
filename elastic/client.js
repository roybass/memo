const es = require('elasticsearch');
const logger = require('../server/logger').create('es-client');

var client = new es.Client({
  host: 'localhost:9200',
  log: 'trace'
});

class Client {

	insert(userId, text, metadata) {
		logger.info("Indexing userId=" userId + ", text=" + text);
		return client.index({
		  index: 'userdata',
		  type: 'mem',
		  body: {
		    title: text,
		    userId: userId,
		    metadata: metadata,
		    published: true,
		  }
		});
	}

	search(userId, text) {
		logger.info("Searching userId=" userId + ", text=" + text);
		return client.search({
			index: 'userdata',
			q: text,
		});
	}
}

module.exports = new Client();