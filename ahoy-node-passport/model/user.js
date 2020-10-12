const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        // ห้ามซ้ำ
        unique: true
    },
    password: String,
    address: String,
    phone: String
});
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;