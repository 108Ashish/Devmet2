const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./routes/auth');
const publicRoutes = require('./routes/public');
const userRoutes = require('./routes/user');
const cors = require('cors');



const app = express();
app.use(cors({
    origin: "http://localhost:3001", // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,               // If you need to send cookies or authorization headers
  }));
app.use(express.json());

const prisma = new PrismaClient();

app.get('/check', (req, res) => {
    const { email } = req.body;
    const user = prisma.user.create({
        data: {
            name: 'Ashish Singh',
            email,
            password: '123456',
        },
    })
    res.send(user);
});

app.use('/auth', authRouter);
app.use('/public', publicRoutes)
app.use('/user', userRoutes)

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
