const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const tokenTypeDictionary = require('../utils/auth/tokenTypeDictionary');
const httpStatus = require('../utils/http/httpStatusCodes');

const redisClient = redis.createClient(process.env.REDIS_URI);


const signToken = (email) => {
    const jwtPayload = {
        email: email,
        tokenType: tokenTypeDictionary.JWT_SIGN_IN,
    };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2 days' });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
    const { email, id } = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => ({
            success: 'true',
            userId: id,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        }))
        .catch(console.log);
};

const handleSignin = async (req, res, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
    //    throw new Error('incorrect form submission');
    }
    const User = mongoose.model('User');
    const user = await User.findOne({ email });
    if (!user) {
        res.json('User does not exist');
    }
    const isValid = bcrypt.compareSync(password, user.hash);
    if (!isValid) {
        res.json('Wrong password');
    }
    return user;
};

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
        }
        return res.json({ id: reply });
    });
};

const signinAuthentication = (bcrypt) => async (req, res) => {
    const { authorization } = req.headers;

    if (authorization) {
        return getAuthTokenId(req, res);
    }
    const user = await handleSignin(req, res, bcrypt);
    const session = await createSession(user);
    return res.json(session);
};

module.exports = {
    signinAuthentication,
    redisClient,
};
