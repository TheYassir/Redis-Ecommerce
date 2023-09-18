const express = require('express');
const router = express.Router();
const appController = require('./controllers/appController');
const CategoriesController = require('./controllers/CategoriesController');
const ProductsController = require('./controllers/ProductsContolller');
const CartController = require('./controllers/CartController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', appController.index);

/**
 * @route GET /products
 * Retourne une liste de ressources
 */
router.get('/products', catchErrors(ProductsController.index));

/**
 * @route POST /products/create
 * Créé une ressource
 */
router.post('/products/create', catchErrors(ProductsController.store));

/**
 * @route GET /products/:id
 * @param id product title
 * returns a resource
 */
router.get('/products/:id', catchErrors(ProductsController.show));
/**
 * @route GET /categories
 * Afficher les catégories
 */
router.get('/categories', catchErrors(CategoriesController.index));
/**
 * @route POST /categories/create
 * Créér une catégorie
 */
router.post('/categories/create', catchErrors(CategoriesController.store));

router.get('/cart', catchErrors(CartController.index));

router.post('/cart/add', catchErrors(CartController.store));

module.exports = router;
