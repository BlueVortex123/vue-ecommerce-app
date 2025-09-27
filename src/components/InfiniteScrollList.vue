<script setup>

// Import required modules and components.
import { defineEmits, ref } from 'vue';

// Declare products array and listener for modal state.
const products = ref([
    {
        id: 1,
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 100,
        picture: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 200,
        picture: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 300,
        picture: 'https://via.placeholder.com/150'
    }
]);
const emit = defineEmits(['show-details']);

// Listen to modal component and pass the product.
const showDetails = (product) => {
    emit('show-details', product);
}

</script>

<template>
    <div class="infinite-scroll">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div v-for="item in products" :key="item.id" class="card card-xm bg-white rounded-lg shadow-lg w-full">
                <figure class="h-48 flex items-center justify-center mt-2">
                    <img :src="item.picture" :alt="item.name" class="object-contain h-full w-full" />
                </figure>
                <div class="card-body p-4 flex flex-col">
                    <h2 class="card-title text-lg font-bold mb-2">{{ item.name }}</h2>
                    <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <p class="font-semibold text-primary">Price: ${{ item.price }}</p>
                        <button class="badge badge-secondary cursor-pointer hover:opacity-80"
                            @click="showDetails(item)">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
