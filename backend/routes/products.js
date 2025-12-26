const express = require('express');
const router = express.Router();
const createUpload = require('../middleware/upload');
const upload = createUpload('products');
const {getAll,create,update,remove,getSubCatByCat} = require('../controllers/productController');
const { verifyToken } = require('../middleware/auth');

router.get('/getAllProducts', verifyToken, getAll);
router.post('/createProduct/', verifyToken, upload.single('image'), create);
router.put('/updateProduct/:id', verifyToken, upload.single('image'), update);
router.delete('/product/:id', verifyToken,remove);
router.get("/getAllSubcategory/:id",verifyToken,getSubCatByCat)
module.exports = router;
