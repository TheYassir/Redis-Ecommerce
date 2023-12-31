import config from '@/mixins/config.js';

export default {
    mixins: [config],
    data() {
        return {
            categories: [],
            products: [],
        };
    },
    methods: {
        async getCategories() {
            try {
                const response = await fetch(
                    `${this.dev_server_url}/categories`
                );

                this.categories = await response.json();
            } catch (e) {
                console.error(e.message);
            }
        },
        async getProducts() {
            try {
                const response = await fetch(`${this.dev_server_url}/products`);

                this.products = await response.json();
            } catch (e) {
                console.error(e.message);
            }
        },
    },
};
