const client = require('../../db/redisClient');

const CartController = {
    async index(req, res) {
        const products = await CartController.getProducts();

        res.status(200).json(products);
    },

    async store(req, res) {
        const redisKey = 'panier';
        let message = 'Le produit a été ajouté';
        // ! Validation des données avant tout
        // * Destructuring ! on, extrait la propriété product de l'objet : ça nous créé une variable product
        const { product } = req.body;
        // { quanity : 1, product: idProduct }
        // * On choisit un sorted set, le score de ce sorted set représentera la quantité

        // * Le produit existe-t-il déjà dans le panier
        const position = await client.zRank(redisKey, product);
        // * si on ne nous donne pas de quantité
        const score = Number(req.body.quantity) || 1;

        // * On assigne la valeur null à position et le bug est difficile à trouver
        // if(position = null) {}

        // * Ici le message d'erreur est explicite
        // if (null = position) {
        //     // * Le message d'erreur explicite
        // }
        // if (null === position) {
        //     // *
        // }

        // *
        if (position === null) {
            // * On ajoute un produit au panier
            await client.zAdd(redisKey, [{ score: score, value: product }]);
        } else {
            // * On met à jour la quantité
            message = 'La quantité a été modifiée';
            // * On doit incrémenter le score d'un sorted set
            // * plantage assuré
            await client.zIncrBy(redisKey, score, product);
        }

        res.status(201).json(message);
    },

    async getProducts() {
        // * On récupère le sorted set complet
        const productsIds = await client.zRangeWithScores('panier', 0, -1);

        return Promise.all(
            productsIds.map(async member => {
                // * member {score: 1, value: product}
                // * On va récupérer le type hash du produit
                const product = await client.hGetAll(member.value);

                product['qty'] = member.score;

                return product;
            })
        );
    },
};

module.exports = CartController;
