const createCacheResponseBody = {
    key: "12345678101112131415",
    value: {
        name: "John Doe",
        city: "New Jersey",
        drives: "Supra"
    },
    timestamp: Date.now(),
    lastAccessed: Date.now(),
    accessCount: 1,
    message: "Set Cache Successfully"
}

const updateCacheResponseBody = {
    "key": "12345678101112131415",
    "value": {
        "name": "John Doe",
        "city": "New Jersey",
        "drives": "Supra"
    },
    "timestamp": Date.now(),
    "lastAccessed": Date.now(),
    "accessCount": 1,
    "message": "Updated Cache Successfully"
}

export {updateCacheResponseBody, createCacheResponseBody};