import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

//Authenticate User, Get Token
//ROUTE: /api/users/login'
const authUser = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body;

    //find user, using email
    const user = await User.findOne({ email });

    //match plain text to user's encrypted password
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid Email Or Password');
    }

})

export { authUser }