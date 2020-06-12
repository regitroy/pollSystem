const mongoose = require('mongoose');

module.exports = {
    question: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        index: true
    }
}