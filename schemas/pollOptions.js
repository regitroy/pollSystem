const mongoose = require('mongoose');

module.exports = {
    pollId: {
        type: mongoose.Schema.ObjectId,
        index: true
    },
    userId: { // for option suggestion
        type: mongoose.Schema.ObjectId,
        index: true
    },
    option: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        default: 0
    }
}