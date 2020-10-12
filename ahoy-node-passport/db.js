const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mama', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});