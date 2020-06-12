const mongoose = require('mongoose');

module.exports = {
    userId: {
        type: mongoose.Schema.ObjectId,
        index: true
    },
    pollId: {
        type: mongoose.Schema.ObjectId,
        index: true
    },
    optionId: {
        type: mongoose.Schema.ObjectId,
        index: true
    }
}