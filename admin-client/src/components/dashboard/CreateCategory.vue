<template>
    <div class="row">
        <div class="col-md-6">
            <h2>Ajouter une catégorie</h2>
            <form class="row g-3 mb-5" @submit.prevent="createCategory">
                <div class="col-md-8">
                    <label for="name" class="form-label"> Category Name </label>
                    <input
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="category"
                    />
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                        Create
                    </button>
                </div>
            </form>
        </div>

        <div class="col-md-3">
            <h2 class="text-center">Catégories</h2>
            <hr />

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Catégorie</th>
                        <th>Mettre à jour</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories">
                        <td v-text="category"></td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-danger btn-sm mx-3"
                            >
                                Supprimer
                            </button>
                        </td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-primary btn-sm mx-3"
                            >
                                Update
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import requests from '@/mixins/requests.js';

export default {
    mixins: [requests],
    data() {
        return {
            categories: [],
            category: '',
        };
    },
    methods: {
        async createCategory() {
            const res = await fetch(
                `${this.dev_server_url}/categories/create`,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({ name: this.category }),
                }
            );

            // * soit une erreur, soit c'est nos données
            const json = await res.json();
            if (res.ok) {
                this.categories = json;

                this.category = '';
                return true;
            }

            // Idéalement, on aurait de ola gestion d'erreur ici
            // Si on est ici , alors json est une instance de Error
            //  ! throw json
            return false;
        },
    },
    mounted() {
        this.getCategories().then(() => null);
    },
};
</script>
