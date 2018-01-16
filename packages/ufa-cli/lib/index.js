module.exports = {
    build: require('./tasks/build'),
    clean: require('./tasks/clean'),
    checkNodeJSVersion: require('./tasks/check-node-version'),
    extractMockAPI: require('./tasks/extract-mock-api')
};

