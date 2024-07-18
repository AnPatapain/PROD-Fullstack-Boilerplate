import express from 'express';
import { getSample } from '../controllers/Sample.controllers';

const router = express.Router();
router.get('/sample', getSample);

export default router;