const mongoose = require('mongoose');
const { Schema } = mongoose;


const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    refreshToken: {
        type: String,
        required: true,
        index: true
    },

    expiresAt: {
        type: Date,
        required: true,
        expires: 0 // Automatically remove expired session documents
    }
}, {
    collection: 'sessions',
    timestamps: true
});

const Secession = mongoose.model('Secession', sessionSchema);
const Session = Secession;

module.exports = { Secession, Session };