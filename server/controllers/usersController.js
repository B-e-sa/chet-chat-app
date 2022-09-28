const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {

    console.log(req.body)

    try {
        const { username, email, password } = req.body

        // See if username is already in use 
        const usernameCheck =
            await User.findOne({ username })
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false })

        // See if username is email is already in use 
        const emailCheck =
            await User.findOne({ email })
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false })

        /* 
        * bcrypt will hash the password before
        * send it to db
        */
        const hashedPassword =
            await bcrypt.hash(password, 10)

        // create user
        const user =
            await User.create({
                email,
                username,
                password: hashedPassword
            })

        delete user.password
        return res.json({ status: true, user })

    } catch (err) {
        next(err)
    }

}

module.exports.login = async (req, res, next) => {

    console.log(req.body)

    try {
        const { email, password } = req.body

        const user =
            await User.findOne({ email })

        // if user doesn't exist
        if (!user)
            return res.json({ msg: 'Incorrect email or password', status: false })
        
        /*
        * compare if the hashed password 
        * is equal to the inserted password
        */
        const isPasswordvalid =
            await bcrypt.compare(password, user.password)
        if (!isPasswordvalid)
            return res.json({ msg: "Invalid password", status: false })
        delete user.password

        // else, login
        return res.json({ status: true, user })

    } catch (err) {
        next(err)
    }

}