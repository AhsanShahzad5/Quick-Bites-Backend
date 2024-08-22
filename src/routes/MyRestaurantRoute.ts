import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { createMyRestaurant , getMyRestaurant , updateMyRestaurant } from "../controllers/MyRestaurantController";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage ,
    limits : {
        fileSize : 5*1024*1024   //5mb file size
    }
})

router.get('/',jwtCheck , jwtParse ,getMyRestaurant);

router.post('/' ,upload.single("imageFile") ,validateMyRestaurantRequest,
jwtCheck , jwtParse ,createMyRestaurant);

router.put('/' ,upload.single("imageFile") ,validateMyRestaurantRequest,
jwtCheck , jwtParse , updateMyRestaurant);

//export
export default router;