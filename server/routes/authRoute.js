import express  from 'express';
import { registerController,loginController ,testController, userAuthController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/register',registerController)

router.post('/login',loginController)
router.get('/test', requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome, Admin!" });
  });
router.get('/user-auth', requireSignIn, userAuthController);

//protected admin auth
router.get('/admin-auth', requireSignIn,isAdmin, userAuthController);

export default router;