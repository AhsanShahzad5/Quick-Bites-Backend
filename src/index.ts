import express , {Request , Response} from 'express';
import cors from 'cors'
import "dotenv/config"
import connectToMongo from '../db';
import myUserRoutes from './routes/MyUserRoute'

const app = express()

// import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;
app.use(express.json({limit : "50mb"}))    
app.use(cors());
connectToMongo()
app.get('/',async (req:Request,res:Response)=>{
    res.json({message : 'welcome to quick bites'});
})
//routes
app.use('/api/my/user' , myUserRoutes)



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
  })