<script setup>

// Import required modules and components
import { ref } from 'vue'
import { ShoppingCartIcon, KeyIcon } from '@heroicons/vue/24/solid'

// Check if the user is on login or register page
const isGuestRoute = (window.location.pathname === '/login' || window.location.pathname === '/register');

// Initialize cart item count ref. Then check localStorage for existing cart data.
const cartItemCount = ref(0);
try {
    const localStorageCartData = localStorage.getItem('cart');
    const cart = localStorageCartData ? JSON.parse(localStorageCartData) : [];
    cartItemCount.value = Array.isArray(cart) ? cart.length : 0;
} catch (e) {
    cartItemCount.value = 0;
}

// Listen for products added to cart from modal.
window.addEventListener('cart-updated', (item) => {
    if (item && typeof item.detail.count === 'number') {
        cartItemCount.value = item.detail.count;
    }
});

// Clear cart and reset cart item count.
const clearCart = () => {
    localStorage.removeItem('cart');
    cartItemCount.value = 0;
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: 0 } }));
};

// Logout the curent user and remove the cart itmes count. 
const logout = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('cart');
    window.location.href = '/login';
}

</script>

<template>
    <header class="bg-white shadow header-fixed">
        <div className="navbar shadow-sm">
            <div className="flex-1">
                <button className="btn btn-ghost text-xl">E-commerce dev</button>
            </div>
            <div v-if="!isGuestRoute" className="flex-none">
                <div class="flex space-x-4">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <span v-show="cartItemCount > 0"
                                    className="badge badge-sm indicator-item bg-red-500 text-white">{{ cartItemCount
                                    }}</span>
                                <ShoppingCartIcon class="h-5 w-5 mr-2" />
                            </div>
                        </div>
                        <div tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">{{ cartItemCount }} Items</span>
                                <span className="text-md font-bold cursor-pointer hover:underline" @click="clearCart">
                                    Clear Shopping Cart
                                </span>
                            </div>
                        </div>
                    </div>
                    <div @click="logout" class="flex items-center rounded cursor-pointer hover:bg-gray-100">
                        <KeyIcon class="h-5 w-5 mr-2" />
                        Logout
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header-fixed {
    position: fixed;
    width: 100%;
    z-index: 50;
}
</style>