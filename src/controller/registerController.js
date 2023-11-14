import client from "../config/dbConnect.js";
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) return res.status(400).json({ 'message': 'Username and password are required'});
    // check for dupicate usernames
    const duplicate = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (duplicate.rowCount > 0) return res.sendStatus(409);

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // create and store the new user
        const result = await client.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [
                email,
                hashedPwd,
            ]
        );
        
        console.log(result);

        res.status(201).json({ 'succes': `New user ${email} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

export default handleNewUser;