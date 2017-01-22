import {Router} from 'express';
import ItemController from '../../controller/ItemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getItem);
router.post('/', itemCtrl.insertItem);

export default router;