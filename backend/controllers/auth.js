const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const pclient = new PrismaClient();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { email, username, password, firstName, lastName, college, country, bio, City, tech, github} = req.body;

        // console.log(tech)
        // console.log("Github:", github);

        const existingUser = await pclient.user.findFirst({
            where: { OR: [{ email }, { username }] }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Email or Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await pclient.user.create({
            data: {
                email:email,
                username: username,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                Country: country,
                bio: bio,
                City: City,
                College: college,
                Tech: tech,
                Github: github
            }
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pclient.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: process.env.EXPIRES_IN,
        });

        res.json({ message: "Login successful", token, userId: user.id, userType: user.Type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { register, login };