const { commandOptions } = require('redis');
const client = require('../../db/redisClient');

const ProductsController = {
    async index(req, res) {
        // ici envoie la réponse avec les products
        const products = await ProductsController.getProducts();

        res.status(200).json(products);
    },

    async store(req, res) {
        // * on valide body avec des middlewares
        const product = req.body;
        // * On va se servir de title comme d'une clé primaire : ce sera l'identifant d'un produit
        const title = product.title;
        // * Un produit doit être unique

        const ok = await client.sAdd('products', title);
        if (ok) {
            /**
             * * Le Hash est une structure clé valeur [$key => $value] /
             * *  redisKey => redisHashDataType({ key: value })
             */

            await client.hSet(title, product);
            const products = await ProductsController.getProducts();

            return res.status(201).json(products);
        }

        return res.status(400).json(`Le produit existe déjà`);
    },

    async show(req, res) {
        // * On a appelé ce champ ID, car le titre du prodtui est son identifiant
        const { id } = req.params;

        // * Notre produit est un hash, on a la clé du hash : l'ID
        const prod = await client.hGetAll(id);

        res.status(200).json(prod);
    },

    async getProducts() {
        // */ On a associé un set avec plusieur hashs : coment on récupère les produits

        // * 1. On récupère le set des produits
        const members = await client.sMembers('products');

        return Promise.all(
            members.map(async member => await client.hGetAll(member))
        );
    },
};

module.exports = ProductsController;
