import client from "../config/dbConnect.js";

const getUsers = async (req, res) => {
    const result = await client.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows);
};

const getUserByEmail = async (req, res) => { 
    const email = req.params.email;
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    res.json(result.rows);
};

const createUser = async (req, res) => {
    const {
        email,
        img,
        firstName,
        lastName,
        roles_user,
        roles_editor,
        roles_admin,
        password,
        jobTitle,
        refreshToken,
        fcmToken,
    } = req.body;
    const result = await client.query(
        "INSERT INTO users (email, img, firstName, lastName, roles_user, roles_editor, roles_admin, password, jobTitle, refreshToken, fcmToken) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        [
            email,
            img,
            firstName,
            lastName,
            roles_user,
            roles_editor,
            roles_admin,
            password,
            jobTitle,
            refreshToken,
            fcmToken,
        ]
    );
    res.json({
        message: "User Added successfully",
        body: {
            user: {
                email,
                img,
                firstName,
                lastName,
                roles_user,
                roles_editor,
                roles_admin,
                password,
                jobTitle,
                refreshToken,
                fcmToken,
            },
        },
    });
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {
        email,
        img,
        firstName,
        lastName,
        roles_user,
        roles_editor,
        roles_admin,
        password,
        jobTitle,
        refreshToken,
        fcmToken,
    } = req.body;

    const result = await client.query(
        "UPDATE users SET email = $1, img = $2, firstName = $3, lastName = $4, roles_user = $5, roles_editor = $6, roles_admin = $7, password = $8, jobTitle = $9, refreshToken = $10, fcmToken = $11 WHERE id = $12",
        [
            email,
            img,
            firstName,
            lastName,
            roles_user,
            roles_editor,
            roles_admin,
            password,
            jobTitle,
            refreshToken,
            fcmToken,
            id,
            ]
    );
    res.json("User Updated Successfully");
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await client.query("DELETE FROM users where id = $1", [id]);
    res.json(`User ${id} deleted Successfully`);
};

export default {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
