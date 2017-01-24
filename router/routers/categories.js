import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const router = Router();
const categoryController = new CategoryController();


router.get('/', categoryController.getAll);
router.get('/:categoryId', categoryController.getCategory);
router.post('/', categoryController.addCategory);
router.delete('/:categoryId', categoryController.deleteCategory);
router.put('/:categoryId', categoryController.updateCategory);
router.post('/:categoryId/:itemId', categoryController.addExitedItemToCategory);
router.post('/:categoryId', categoryController.addItemToCategory);
router.put('/:categoryId/:itemId', categoryController.updateItemForCategory);
router.delete('/:categoryId/:itemId', categoryController.deleteItemForCategory);

export default router;
