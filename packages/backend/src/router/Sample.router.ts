import express from 'express';
import { getOneMessage } from '../controllers/Sample.controllers';

const router = express.Router();
router.get('/message', getOneMessage);

export default router;