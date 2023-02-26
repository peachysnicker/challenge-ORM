const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET all tags including Product data 
router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: [{ model: Product, through: ProductTag }],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET a single tag by id including product info
router.get('/:id', async (req, res) => {
    try {
      const tagData = await Product.findByPk(req.params.id, {
        include: [{model: Product, through: ProductTag
       }],
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


//CREATE a new product
router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create(req.body);
      res.status(200).json(newTag);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// UPDATE a tag by id
router.put('/:id', async (req, res) => {
    Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updateTag) => {
        res.json(updateTag);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });


  //DELETE a tag by id
  router.delete('/:id', async (req, res) => {
    try {
      const tagDelete = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!tagDelete) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
      res.status(200).json(tagDelete);
    } catch (err) {
      res.status(500).json(err);
    }
    });





module.exports = router;
