import jwt from 'jsonwebtoken'


const generateToken = (res, userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    // set JWT as an http-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',  // prevent csrf attack
        maxAge: (1) * 24 * 60 * 60 * 1000, // 1 day (number in parenthesis)
    })

    return token;
};

export default generateToken;
