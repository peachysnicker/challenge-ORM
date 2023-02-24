const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk({
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id to update cateogry by its id value!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const newCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!newCategory) {
      res.status(404).json({ message: 'No category with that id to delete!' });
      return;
    }
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
