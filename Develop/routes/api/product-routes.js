const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// GET all products including the category and tag info
router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [
                { model: Category},
                { model: Tag, through: ProductTag}
              ],
        })
        res.status(200).json(locationData);
         } catch (err) {
     res.status(500).json(err);
    }
});








module.exports = router;