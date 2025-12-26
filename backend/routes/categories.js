const express = require('express');
const router = express.Router();
const createUpload = require('../middleware/upload');
const upload = createUpload('categories');
const {getAll,create,update,remove} = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/auth');

router.get('/getAllCategory', verifyToken,getAll);
router.post('/createCategoty', verifyToken, upload.single('image'), create);
router.put('/updateCategory/:id', verifyToken, upload.single('image'), update);
router.delete('/deleteCategory/:id', verifyToken, remove);

module.exports = router;
