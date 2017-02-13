import {Router} from 'express';
import ItemController from '../../controller/itemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.post('/', itemCtrl.addItem);
router.delete('/:itemId',itemCtrl.deleteItem);
router.put('/:itemId', itemCtrl.updateItem);

export default router;