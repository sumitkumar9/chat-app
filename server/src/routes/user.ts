import express from 'express';
import { login } from '../controllers/user';

const router = express.Router();

router.get('/', login);

export { router as userRouter };