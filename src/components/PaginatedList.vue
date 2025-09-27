<script setup>

// Import required modules and components.
import { defineEmits, ref } from 'vue';

// Declare products array and pagination related refs.
const products = ref({
    "current_page": 1,
    "data": [
        {
            "id": 1,
            "name": "Apple iPhone 12",
            "description": "Blast past fast. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. And Night mode on every camera.",
            "picture": "",
            "price": "799.00"
        },
        {
            "id": 2,
            "name": "Apple iPhone 12 Pro",
            "description": "A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.",
            "picture": "",
            "price": "999.00"
        },
        {
            "id": 3,
            "name": "Apple Watch Series 6",
            "description": "The future of health is on your wrist. Measure your blood oxygen level with a revolutionary new sensor and app.",
            "picture": "",
            "price": "399.00"
        },
        {
            "id": 4,
            "name": "Apple AirPods Pro",
            "description": "Active Noise Cancellation for immersive sound. Transparency mode for hearing and connecting with the world around you.",
            "picture": "",
            "price": "249.00"
        },
        {
            "id": 5,
            "name": "Apple iPad Pro",
            "description": "With the powerful A12Z Bionic chip, pro cameras, and LiDAR Scanner, iPad Pro is more versatile than ever.",
            "picture": "",
            "price": "799.00"
        },
        {
            "id": 6,
            "name": "Apple MacBook Air",
            "description": "The Apple M1 chip gives the 13‑inch MacBook Air speed and power beyond belief.",
            "picture": "",
            "price": "999.00"
        }
    ],
    "last_page": 3,
})
const currentPage = ref(1);
const totalPages = ref(1)

// Declare modal state.
const emit = defineEmits(['show-details']);

// Open the modal and show the product details.
const showDetails = (product) => {
    emit('show-details', product);
}



</script>
<template>
    <div class="paginated-list">
        <div class="flex justify-center my-4 join">
            <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage -= 1">
                «
            </button>
            <button class="join-item btn btn-sm">Page {{ currentPage }}</button>
            <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="currentPage += 1">
                »
            </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-8">
            <div v-for="item in products.data" :key="item.id" class="card card-xm bg-white rounded-lg shadow-lg w-full">
                <figure class="h-48 flex items-center justify-center mt-2">
                    <img :src="item.picture" :alt="item.name" class="object-contain h-full w-full" />
                </figure>
                <div class="card-body p-4 flex flex-col">
                    <h2 class="card-title text-lg font-bold mb-2">{{ item.name }}</h2>
                    <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <p class="font-semibold text-primary">Price: ${{ item.price }}</p>
                        <button class="badge badge-secondary cursor-pointer hover:opacity-80 px-3 py-1"
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
