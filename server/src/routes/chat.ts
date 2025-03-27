import express from 'express';
import { newGroup, getMyChats, getMyGroup, addMembers, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat } from '../controllers/chat';
import { checkAuth } from "../middlewares/checkauth";
import { attachmentMulter } from '../middlewares/multer';

const router = express.Router();

router.post('/new/group', checkAuth, newGroup);
router.get('/my/chats', checkAuth, getMyChats);
router.get('/my/groups', checkAuth, getMyGroup);
router.put('/add/members', checkAuth, addMembers);
router.put('/leave/:chatId', checkAuth, leaveGroup);
router.post('/message', checkAuth, attachmentMulter, sendAttachments);
router.route('/:chatId').get(getChatDetails).put(renameGroup).delete(deleteChat);


export { router as chatRouter };
