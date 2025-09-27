import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/Pages/Dashboard.vue'
import Login from '@/Pages/Login.vue'
import Register from '@/Pages/Register.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: '/dashboard',
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // Check for token
    const isAuthenticated = !!localStorage.getItem('user-token'); 

    // If authenticated redirect to dashboard in case of accessing login page.
    if (to.name === 'login' && isAuthenticated) {
        next({ name: 'dashboard' });
        return;
    }

    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            // If not authenticated, redirect to the login page.
            next({ name: 'login' });
        }
        else{
            // If authenticated, proced to the requested page.
            next();
        }
    } else {
        // For all other routes, allow the user to proceed.
        next();
    }
});

export default router