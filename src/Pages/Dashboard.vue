<script setup>

// Import required modules and components.
import { ref } from 'vue';
import PaginatedList from '@/components/PaginatedList.vue';
import ProductModal from '@/components/ProductModal.vue';
import InfiniteScrollList from '@/components/InfiniteScrollList.vue';

// Define refs for selected product, modal state and if the option of infinite scroll is selected.
const selectedProduct = ref(null);
const isModalOpen = ref(false);
const isInfiniteScroll = ref(true);

// Open the product modal and pass the selected product.
const openProductModal = (product) => {
    if (product) {
        selectedProduct.value = product;
        isModalOpen.value = true;
    }
}

</script>

<template>
    <div class="dashboard bg-gradient-to-br from-pink-100 to-blue-300 min-h-screen p-8">
        <div class="flex flex-col items-center mb-8">
            <h1 class="text-3xl font-bold text-blue-800 mb-4">Dashboard</h1>
            <label class="cursor-pointer label justify-center">
                <span class="label-text mr-2">Paginated</span>
                <input type="checkbox" class="toggle toggle-primary mx-2" v-model="isInfiniteScroll" />
                <span class="label-text ml-2">Infinite Scroll</span>
            </label>
        </div>

        <InfiniteScrollList v-if="isInfiniteScroll" @show-details="openProductModal" />
        <PaginatedList v-else @show-details="openProductModal" />

        <ProductModal v-show="isModalOpen" :open="isModalOpen" :product="selectedProduct"
            @close="isModalOpen = false" />
    </div>
</template>

<style scoped></style>
