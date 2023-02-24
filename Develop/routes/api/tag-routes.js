const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
     if (!tagData) {
      res.status(404).json({ message: 'No tag data found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


 // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findByPk({
        include: [{ model: Product},{ model: Product, through: ProductTag, as: `product_tags`}],
      });
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// create a new tag
router.post('/', async (req, res) => {
  const { tagName } = req.body;
  if (!tagName) {
    res.status(500).json({message: "Improperly formatted request"});
    return;
  }
  try {
    const newTag = await Tag.create({tag_name: tagName});
    if (!newTag) {
      res.status(500).json({message: "Could not create the new tag"});
      return;  
    }
    res.status(200).json(newCategory);

  } catch (err) {
    res.status(500).json({message: "Could not create the new tag 500"});
    return;
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id to update name by its id value!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const newTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!newTag) {
      res.status(404).json({ message: 'No tag with that id to delete!' });
      return;
    }
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
