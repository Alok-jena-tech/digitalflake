const express = require('express');
const router = express.Router();
const createUpload = require('../middleware/upload');
const upload = createUpload('subcategories');
const {getAll,create,update,remove} = require('../controllers/subcategoryController');
const { verifyToken } = require('../middleware/auth');

router.get('/getAllSubCategories', verifyToken, getAll);
router.post('/createSubCategories', verifyToken, upload.single('image'), create);
router.put('/updateSubCategories/:id', verifyToken, upload.single('image'), update);
router.delete('/deleteSubCategories/:id', verifyToken, remove);

module.exports = router;
