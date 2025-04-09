import express from 'express';
import { acceptFriendRequest, login, register, searchUser, sendFriendRequest, getMyProfile } from '../controllers/user';
import { checkAuth } from "../middlewares/checkauth";
import { singleAvatar } from "../middlewares/multer";

const router = express.Router();

router.post('/login', login);
router.post('/register', singleAvatar, register);

router.use(checkAuth);

router.get('/me', getMyProfile);
router.get('/search', searchUser);
router.put('/sendrequest', sendFriendRequest);
router.put('/acceptrequest', acceptFriendRequest);
router.get('/notifications');
export { router as userRouter };
