import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { test  , createCurrentUser , updateCurrentUser , getCurrentUser} from "../controllers/MyUserController";
const router = express.Router();

router.get('/test' , test);
router.get('/' , jwtCheck , jwtParse , getCurrentUser);
router.post('/' , jwtCheck , createCurrentUser);
router.put('/' , jwtCheck ,jwtParse , validateMyUserRequest , updateCurrentUser);



//export
export default router;