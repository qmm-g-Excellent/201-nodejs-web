import {Router} from 'express';
import CartController from '../../controller/CartController';

const router = Router();
const cartController = new CartController();

router.get('/',cartController.getAll);
router.get('/:cartId',cartController.getCart);
router.post('/',cartController.addCart);
router.put('/:userId/:itemId',cartController.updateCart);
router.delete('/:userId/:cartId',cartController.deleteCart);
router.post('/:userId/:cartId',cartController.addItemToCart);
router.delete('/:userId/:cartId/:itemId',cartController.deleteItemFromCart);


export default router;