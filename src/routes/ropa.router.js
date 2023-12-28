import { Router } from 'express';
import ropaController from '../controllers/ropa.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/',ropaController.getAllRopa);
router.post('/',ropaController.createRopa);
router.post('/withimage',uploader.single('image'), ropaController.createRopaWithImage);
router.put('/:pid',ropaController.updateRopa);
router.delete('/:pid',ropaController.deleteRopa);

export default router;
