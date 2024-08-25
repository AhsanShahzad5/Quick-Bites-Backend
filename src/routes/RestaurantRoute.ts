import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { searchRestaurant ,  getRestaurant} from "../controllers/RestaurantController";
import multer from "multer";
import { param } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage ,
    limits : {
        fileSize : 5*1024*1024   //5mb file size
    }
})

router.get(
    "/:restaurantId",
    param("restaurantId")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("restaurantId paramenter must be a valid string"),
    getRestaurant
  );
router.get(
    "/search/:city",
    param("city")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("City paramenter must be a valid string"),
    searchRestaurant
  );
  



export default router;