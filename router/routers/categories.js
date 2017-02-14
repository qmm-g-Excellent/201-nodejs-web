import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const router = Router();
const categoryController = new CategoryController();


router.get('/', categoryController.getAll);
router.get('/:categoryId', categoryController.getOne);
router.post('/', categoryController.addCategory);
router.delete('/:category', categoryController.deleteCategory);
router.put('/:categoryId', categoryController.updateCategory);

export default router;
