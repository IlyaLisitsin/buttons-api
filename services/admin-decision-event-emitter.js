const EventEmitter = require('events');

class AdminDecisionEmitter extends EventEmitter {}

const adminDecisionEmitter = new AdminDecisionEmitter();

module.exports = { adminDecisionEmitter };
