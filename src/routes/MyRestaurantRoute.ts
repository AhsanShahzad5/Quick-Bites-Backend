import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { createMyRestaurant } from "../controllers/MyRestaurantController";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage ,
    limits : {
        fileSize : 5*1024*1024   //5mb file size
    }
})

router.get('/' , ()=>{
    console.log();
    
})

router.post('/' ,upload.single("imageFile") ,validateMyRestaurantRequest,
jwtCheck , jwtParse ,createMyRestaurant);





//export
export default router;