const authRsolver = require('./auth');
const eventRsolver = require('./event');
const bookingRsolver = require('./booking');

const rootresolver = {
    ...authRsolver,
    ...eventRsolver,
    ...bookingRsolver,
}

module.exports = rootresolver;