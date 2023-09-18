const client = require('../../db/redisClient');

const CategoriesController = {
    async index(req, res) {
        // ici envoie la réponse avec les catégories
        const categories = await CategoriesController.getCategories();

        res.status(200).json(categories);
    },

    async store(req, res) {
        // * On valide name, car name vient du client
        const { name } = req.body;

        // * De quelle type de données redis on a besoin ?
        // * un Set est un type de tableau dont les éléments sont uniques

        const ok = await client.sAdd('categories', name);

        if (ok) {
            const categories = await CategoriesController.getCategories();

            return res.status(201).json(categories);
        }

        // const err = new Error(`Nous n'avons pas pu créér la catégorie ${name}`);
        // err.status = 401;
        // throw err;
        return res.status(400).json({
            message: `Nous n'avons pas pu créér la catégorie ${name}`,
        });
    },

    async getCategories() {
        const categories = await client.sMembers('categories');

        return categories;
    },
};

module.exports = CategoriesController;
