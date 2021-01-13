import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    //user id is payload in token
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '14d' });
};

export default generateToken;

