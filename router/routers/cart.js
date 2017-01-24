import {Router} from 'express';
import CartController from '../../controller/CartController';

const router = Router();
const cartController = new CartController();

router.get('/',cartController.getAll);
router.post('/',cartController.addCart);

export default router;