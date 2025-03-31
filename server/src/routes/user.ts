import express from 'express';
import { acceptFriendRequest, login, register, searchUser, sendFriendRequest } from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/search', searchUser);
router.put('/sendrequest', sendFriendRequest);
router.put('/acceptrequest', acceptFriendRequest);
router.get('/notifications');
export { router as userRouter };
