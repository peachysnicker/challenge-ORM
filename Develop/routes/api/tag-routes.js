const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400.json(err));
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
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
