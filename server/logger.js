
const TRACE = 1;
const DEBUG = 2;
const INFO = 3;
const WARN = 4;
const ERROR = 5;
const CRIT = 6;
const EOTWAWKI = 7;

class Logger {
	constructor(context) {
		this.context = context;
	}
	log(text, ...params) {
		this._log(INFO, text, params);
	}

	warn(text, ...params) {
		this._log(WARN, text, params);
	}

	debug(text, ...params) {
		this._log(DEBUG, text, params);
	}

	info(text, ...params) {
		this._log(INFO, text, params);
	}

	error(text, ...params) {
		this._log(ERROR, text, params);
	}

	_log(level, text, ...params) {
		console.log(new Date().toString() + ': ' + this.context + '[' + level + ']' + ': ' + text);
	}
}


class LoggerFactory {
	create(context) {
		return new Logger(context);
	}
}

module.exports = new LoggerFactory();