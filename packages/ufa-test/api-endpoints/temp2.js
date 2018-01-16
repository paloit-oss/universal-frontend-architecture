function create(req, res, next) {
    res.json({
        "rootVO": {
            "id": "Hey",
            "name": "YES GURU!!"
        },
        "presentation": {}
    });
}

var apiEndPoints = [
    {
        method: 'GET',
        url: '/guru',
        callback: create
    }
];

module.exports = {
    mainUrl: '',
    routes: apiEndPoints
};
