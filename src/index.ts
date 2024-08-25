import express, { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import "dotenv/config"
import connectToMongo from '../db';
import myUserRoutes from './routes/MyUserRoute'
import MyRestaurantRoute from './routes/MyRestaurantRoute'
import RestaurantRoute from './routes/RestaurantRoute'
import OrderRoute from './routes/OrderRoute'

const app = express()
const PORT = process.env.PORT || 5000;

// import dotenv from 'dotenv';

const allowedOrigins = ['http://localhost:5173'];

// Configure CORS options
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
};

//for stripe encryption stuff
app.use("/api/order/checkout/webhook" , express.raw({ type:"*/*"}));


app.use(express.json({ limit: "50mb" }))
app.use(cors(corsOptions));

connectToMongo()

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'welcome to quick bites' });
})
app.get('/health', async (req: Request, res: Response) => {
    res.send({ message: "Health OK!!" });
})


//routes
app.use('/api/my/user', myUserRoutes)
app.use('/api/my/restaurant', MyRestaurantRoute)
app.use('/api/restaurant', RestaurantRoute)
app.use("/api/order", OrderRoute );



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})