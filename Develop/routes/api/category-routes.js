const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [
          { model: Product }
        ],
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Find all categories with its products


//Find one category by id and its products


//Create a new category


//Update category by id 


//Delete a category by id










module.exports = router;