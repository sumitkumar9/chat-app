import expres from 'express';
import { newGroup, getMyChats, getMyGroup, addMembers } from '../controllers/chat';
import { checkAuth } from "../middlewares/checkauth";

const router = expres.Router();

router.post('/new/group', checkAuth, newGroup);
router.get('/my/chats', checkAuth, getMyChats);
router.get('/my/groups', checkAuth, getMyGroup);
router.put('/add/members', checkAuth, addMembers);


export { router as chatRouter };
