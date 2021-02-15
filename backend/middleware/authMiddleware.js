import JWT from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            //split at space - removes 'Bearer'
            token = req.headers.authorization.split(' ')[1];

            const decoded = JWT.verify(token, process.env.JWT_SECRET);
            //console.log(decoded); 
            //{ id: '5ff612ef4aca0c4308e13e40', iat: 1610557482, exp: 1611767082 }

            //get user by Id, remove password, puts data is req.user which will be accessible in all routes using middleware
            req.user = await User.findById(decoded.id).select('-password')

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized, Token Failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized, No Token')
    }

})

export { protect }