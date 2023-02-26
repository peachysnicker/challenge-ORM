const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint
//Find all categories with its products
router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [{ model: Product }], //including product model
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Find one category by id and include its products
router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }], //including product model
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with that id! Sorry!'});
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Create a new category
router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});


//Update category by id 
router.put('/:id', async (req, res) => {
    Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedCategory) => {
        res.json(updatedCategory);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

//Delete a category by id
router.delete('/:id', async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });

    if (!categoryData) {
        res.status(404).json({message: 'No category found with this id!'});
        return;
    }
    res.status(200).json(locationData); 
        } catch (err) {
        res.status(500).json(err);
    }
});









module.exports = router;