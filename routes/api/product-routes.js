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
        res.status(200).json(productData);
         } catch (err) {
     res.status(500).json(err);
    }
});


//GET a single product by id including the category and tag info
router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
        include: [
          { model: Category },
          { model: Tag, through: ProductTag }
        ],
      });
      if (!productData) {
        res.status(404).json({ message: 'No product found with that id!' });
        return;
      }
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

/* Insomnia json req.body should look like this...
    product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
*/

//CREATE a new product
router.post('/', (req, res) => {
    Product.create(req.body)
      .then((product) => {
        if (req.body.tagIds.length) {
          const productTag = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTag);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });


//UPDATE a new product
router.put('/:id', (req, res) => {
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTags = ProductTag.findAll({ where: { product_id: req.params.id } 
        });
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
          //remove
          const productTagsRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
  
          // run
            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          }
  
          return res.json(product);
      }) 
      .catch((err) => {
        res.status(400).json(err);
      });
  });

//DELETE a product by id
router.delete('/:id', async (req, res) => {
    try {
      const productDelete = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!productDelete) {
        res.status(404).json({ message: 'No product found with that id!' });
        return;
      }
      res.status(200).json(productDelete);
    } catch (err) {
      res.status(500).json(err);
    }
    });








module.exports = router;