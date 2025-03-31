import express from 'express';
import { newGroup,
        getMyChats,
        getMyGroup,
        addMembers,
        leaveGroup,
        sendAttachments,
        getChatDetails,
        renameGroup,
        deleteChat, 
        getMessages 
    } from '../controllers/chat';
import { checkAuth } from "../middlewares/checkauth";
import { attachmentMulter } from '../middlewares/multer';

const router = express.Router();

router.post('/new/group', checkAuth, newGroup);
router.get('/my/chats', checkAuth, getMyChats);
router.get('/my/groups', checkAuth, getMyGroup);
router.put('/add/members', checkAuth, addMembers);
router.put('/leave/:chatId', checkAuth, leaveGroup);
router.post('/message', checkAuth, attachmentMulter, sendAttachments);
router.get('/message/:chatId', checkAuth, getMessages);
router.route('/:chatId').get(checkAuth, getChatDetails).put(checkAuth, renameGroup).delete(checkAuth, deleteChat);


export { router as chatRouter };
