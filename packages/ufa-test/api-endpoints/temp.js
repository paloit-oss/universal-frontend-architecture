var baseURL = '/org';
var baseState = 'app.ba.authorization-maintenance';

function sendSuccess(req, res, next) {
    res.json({
        'success': 'true'
    });
}

function create(req, res, next) {
    res.json({
        "rootVO": {
            "id": null,
            "name": null
        },
        "presentation": {}
    });
}

function editHistory(req, res, next) {
    res.json({
        "rootVO": {
            "id": 5,
            "name": "John"
        },
        "presentation": {}
    });
}

function viewHistory(req, res, next) {
    if (Number(req.params.id) > 3000) {
        res.json({
            "rootVO": {
                "id": 5,
                "name": "John"
            },
            "state": "PENDING_INTERNAL",
            "presentation": {}
        });
    }
    else {
        res.json({
            "rootVO": {
                "id": 5,
                "name": "John"
            },
            "presentation": {}
        });
    }
}

function check(req, res, next) {
    res.json({
        "rootVO": {
            "id": 3,
            "name": "Rambo"
        },
        "presentation": {}
    });
}

function edit(req, res, next) {
    res.json({
        "rootVO": {
            "id": 3,
            "name": "Sarah"
        },
        "presentation": {}
    });
}

function view(req, res, next) {
    res.json({
        "rootVO": {
            "id": 3,
            "name": "Sarah"
        },
        "presentation": {}
    });
}

function inprepList(req, res, next) {
    res.json({
        "totalItems": "3",
        "columnDefs" : [
            {
                "name" : "name",
                "displayName" : "NAME",
                "visible" : true,
                "type" : null,
                "options" : null
            },
            {
                "name" : "id",
                "displayName" : null,
                "visible" : false,
                "type" : null,
                "options" : null
            },
            {
                "name" : "Actions",
                "displayName" : "ACTIONS",
                "visible" : true,
                "type" : "button",
                "options" :
                [
                    {
                        "buttonLabel" : "EDIT",
                        "type" : "edit",
                        "stateConfig": {
                            "state": baseState + ".inprep.history-edit",
                            "param": "historyId",
                            "field": "id"
                        }
                    },
                    {
                        "buttonLabel" : "VIEW",
                        "type" : "view",
                        "stateConfig": {
                            "state": baseState + ".inprep.history-view",
                            "param": "historyId",
                            "field": "id"
                        }
                    }
                ]
            }
        ],
        "data" :
        [
            {
                "name" : "Demo 2050",
                "id" : 2050
            },
            {
                "name" : "Demo 2051",
                "id" : 2051
            },
            {
                "name" : "Demo 2053",
                "id" : 2053
            }
        ]
    });
}

function pendingList(req, res, next) {
    res.json({
        "totalItems": "3",
        "columnDefs" : [
            {
                "name" : "name",
                "displayName" : "NAME",
                "visible" : true,
                "type" : null,
                "options" : null
            },
            {
                "name" : "id",
                "displayName" : null,
                "visible" : false,
                "type" : null,
                "options" : null
            },
            {
                "name" : "Actions",
                "displayName" : "ACTIONS",
                "visible" : true,
                "type" : "button",
                "options" :
                [
                    {
                        "buttonLabel" : "CHECK",
                        "type" : "edit",
                        "stateConfig": {
                            "state": baseState + ".pending.history-check",
                            "param": "historyId",
                            "field": "id"
                        }
                    },
                    {
                        "buttonLabel" : "VIEW",
                        "type" : "view",
                        "stateConfig": {
                            "state": baseState + ".pending.history-view",
                            "param": "historyId",
                            "field": "id"
                        }
                    }
                ]
            }
        ],
        "data" :
        [
            {
                "name" : "Demo 3050",
                "id" : 3050
            },
            {
                "name" : "Demo 3051",
                "id" : 3051
            },
            {
                "name" : "Demo 3053",
                "id" : 3053
            }
        ]
    });
}

function masterList(req, res, next) {
    res.json({
        "totalItems": "3",
        "columnDefs" : [
            {
                "name" : "name",
                "displayName" : "NAME",
                "visible" : true,
                "type" : null,
                "options" : null
            },
            {
                "name" : "id",
                "displayName" : null,
                "visible" : false,
                "type" : null,
                "options" : null
            },
            {
                "name" : "Actions",
                "displayName" : "ACTIONS",
                "visible" : true,
                "type" : "button",
                "options" :
                [
                    {
                        "buttonLabel" : "EDIT",
                        "type" : "edit",
                        "stateConfig": {
                            "state": baseState + ".master.edit",
                            "param": "id",
                            "field": "id"
                        }
                    },
                    {
                        "buttonLabel" : "VIEW",
                        "type" : "view",
                        "stateConfig": {
                            "state": baseState + ".master.view",
                            "param": "id",
                            "field": "id"
                        }
                    }
                ]
            }
        ],
        "data" :
        [
            {
                "name" : "Demo 1050",
                "id" : 1050
            },
            {
                "name" : "Demo 1051",
                "id" : 1051
            },
            {
                "name" : "Demo 1053",
                "id" : 1053
            }
        ]
    });
}

var apiEndPoints = [
    {
        method: 'GET',
        url: baseURL + '/create',
        callback: create
    },
    {
        method: 'GET',
        url: baseURL + '/history/edit/:id',
        callback: editHistory
    },
    {
        method: 'GET',
        url: baseURL + '/history/view/:id',
        callback: viewHistory
    },
    {
        method: 'GET',
        url: baseURL + '/history/check/:id',
        callback: check
    },
    {
        method: 'GET',
        url: baseURL + '/edit/:id',
        callback: edit
    },
    {
        method: 'GET',
        url: baseURL + '/view/:id',
        callback: view
    },
    {
        method: 'POST',
        url: baseURL + '/inprep/list',
        callback: inprepList
    },
    {
        method: 'POST',
        url: baseURL + '/pending/list',
        callback: pendingList
    },
    {
        method: 'POST',
        url: baseURL + '/master/list',
        callback: masterList
    },
    {
        method: 'POST',
        url: baseURL + '/create-draft',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/create-submit',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/history/discard',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/approve',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/reject',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/return',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/delete',
        callback: sendSuccess
    },
    {
        method: 'POST',
        url: baseURL + '/update-draft',
        callback: sendSuccess
    }
];

module.exports = {
    mainUrl: '',
    routes: apiEndPoints
};
