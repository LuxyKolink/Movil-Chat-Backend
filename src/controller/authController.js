import client from "../config/dbConnect.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required' });
    const foundUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log(foundUser.rowCount);
    if (foundUser.rowCount === 0) return res.sendStatus(401); // Unauthorized
    const user = foundUser.rows[0];
    // evaluate password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": user.email,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        );
        const refreshToken = jwt.sign(
            { "email": user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // saving refreshToken with current user
        user.refreshToken = refreshToken;
        const result = await client.query(
            "UPDATE users SET refreshToken = $1 WHERE id = $2",
            [
                refreshToken,
                user.id,
            ]
        );
        console.log(result);

        // working with diferente clients or chrome browser for example:
        // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;