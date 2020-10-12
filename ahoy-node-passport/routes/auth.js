const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user');

router.post('/register', async(req, res) => {
    const { username, password, name, address, phone } = req.body
        // simple validation
    if (!name || !username || !password || !address || !phone) {
        return res.render('register', { message: 'Please try again' })
    }
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = new User({
        name,
        username,
        password: passwordHash,
        address,
        phone
    });
    await user.save()
        // req.session.user = user;
    res.render('index', { user })
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    // simple validation
    const user = await User.findOne({
        username
    });

    if (user) {
        const isCorrect = bcrypt.compareSync(password, user.password)

        if (isCorrect) {
            req.session.user = user;
            return res.redirect('/');
        } else {
            return res.render('login', { message: 'Username or Password incorrect' })
        }
    } else {
        return res.render('login', { message: 'Username does not exist.' })
    }
})
module.exports = router