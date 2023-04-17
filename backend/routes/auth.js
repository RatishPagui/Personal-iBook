const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")


JWT_SECRET = "mynameisRATISH"

router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be have atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // console.log(req.body)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(authToken)

        res.send({ authToken: authToken })

        //   .then(user => res.json(user))
        //   .catch(err => {console.log(err)})
        //   res.json({error: "Please enter unique value for Email"})

        // const user = User(req.body);
        // user.save()


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }

})




router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to connect with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to connect with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})


// ROUTE-3
router.post('/getuser', fetchuser, async (req, res) => {

try {
  const userId = req.user.id;  
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error")
}

})

module.exports = router;