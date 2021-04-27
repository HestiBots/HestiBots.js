module.exports = class HestiError extends TypeError {
	constructor(msg = "Unknown Error") {
		super();
		
		this.name = "[HestiBots Error]";
		this.message = msg;
	}
};