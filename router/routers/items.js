const {Router} = require('express');
const ItemController = require('../../controller/itemController');

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.post('/', itemCtrl.addItem);
router.delete('/:itemId',itemCtrl.deleteItem);
router.put('/:itemId', itemCtrl.updateItem);

module.exports = router;