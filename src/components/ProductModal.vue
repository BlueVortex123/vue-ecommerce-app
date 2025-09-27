<script setup>

// Import required modules and components.
import { ref } from 'vue';
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'

// Define current product and open modal props.
const props = defineProps({
    product: Object,
    open: Boolean
});

// Add state of adding to cart.
const isAdding = ref(false);
const added = ref(false);

// Define close event.
const emit = defineEmits(['close']);

// Close modal.
const closeModal = () => {
    emit('close');
};

// Add item to cart.
const addCartItem = () => {
    // Check if product is valid.
    if (!props.product || !props.product.id) return;

    // Begin the process of adding to cart.
    isAdding.value = true;
    try {
        // Check the current cart items.
        const localStorageCartData = localStorage.getItem('cart');
        const cartItems = localStorageCartData ? JSON.parse(localStorageCartData) : [];

        // Add the current product to cart.  
        cartItems.push({ id: props.product.id });
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Send update event to the Header component to update the cart count.
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: cartItems.length } }));

        // Close the modal and reset values.
        added.value = true;
        isAdding.value = false;
        closeModal();
    } catch (e) {
        console.error('Failed to add to cart', e);
    }
};

</script>

<template>
    <div v-if="open" class="modal modal-open" tabindex="-1" aria-modal="true" role="dialog">
        <div class="card card-side bg-base-100 shadow-sm flex flex-col md:flex-row">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal"
                aria-label="Close">✕</button>
            <figure v-if="product.picture" class="w-full md:w-1/2 flex-shrink-0">
                <img :src="product.picture" :alt="product.name" class="object-cover rounded w-full h-48 md:h-full" />
            </figure>
            <div class="card-body w-full md:w-1/2">
                <h2 class="card-title">{{ product.name }}</h2>
                <p class="font-semibold">Price: ${{ product.price }}</p>

                <span>Description
                    <hr>
                </span>

                <p>{{ product.description }}</p>

                <div class="flex items-center gap-2">
                    <div class="badge badge-secondary cursor-pointer hover:opacity-80">
                        <ShoppingCartIcon class="h-5 w-5" />
                        <span @click="addCartItem">Add to cart</span>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>