const {Router} = require('express');
const CartController = require('../../controller/cartController');

const router = Router();
const cartController = new CartController();

router.get('/',cartController.getAll);
router.get('/:cartId',cartController.getOne);
router.post('/',cartController.addCart);
router.put('/:cartId',cartController.updateCart);
router.delete('/:cartId',cartController.deleteCart);

module.exports = router;