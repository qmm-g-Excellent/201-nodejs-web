import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const router = Router();
const categoryController = new CategoryController();


router.get('/', categoryController.getAll);
router.get('/:categoryId', categoryController.getCategory);
router.post('/', categoryController.insertCategory);
router.delete('/:categoryId', categoryController.deleteCategory);
router.put('/:categoryId', categoryController.updateCategory);
router.post('/:categoryId', categoryController.addItemToCategory);
// router.post('/:categoryId/:itemId', categoryController.addItemIdToCategory);

export default router;
