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
    if (!categoryData) {
      res.status(404).json({ message: 'No category data found!' });
      return;
    }
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
    if (!categoryData) {
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
  const { categoryName } = req.body;
  if (!categoryName) {
    res.status(500).json({message: "Improperly formatted request"});
    return;
  }
  try {
    const newCategory = await Category.create({category_name: categoryName});
    if (!newCategory) {
      res.status(500).json({message: "Could not create the new category"});
      return;  
    }
    res.status(200).json(newCategory);

  } catch (err) {
    res.status(500).json({message: "Could not create the new category 500"});
    return;
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
    if (!categoryData[0] === 0) {
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
    const deletedCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category with that id to delete!' });
      return;
    }
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
