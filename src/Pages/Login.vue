<script setup>

// Import node modules and elements. 
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { ref, watch, computed } from 'vue';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/solid';

// Store all input errors in an array.
const errorMessages = ref([]);

// Declare form data input fields
const form = ref({
    email: '',
    password: '',
})

// Create validation rules for form input fields. 
const formValidationRules = computed(() => ({
    email: /\S+@\S+\.\S+/.test(form.value.email),
    password: form.value.password.length >= 6,
}));

// Create validation input error  messages. 
const inputValidationErrors = {
    email: 'Please enter a valid email address.',
    password: 'Password must be at least 6 characters long.',
};

// Show when a form input has an error.
const showErrors = ref({
    email: false,
    password: false,
});

// Check if we have any error in the form.
const isFormValid = computed(() =>
    Object.values(formValidationRules.value).every(Boolean)
);

// Submit request
const submitForm = () => {

    // Before making the request, check if the form is valid.
    if (isFormValid.value) {
        // Validate credentials locally
        if (form.value.email === 'test@test.com' && form.value.password === '123456') {
            // Simulate successful login
            const fakeToken = 'fake-jwt-token';
            localStorage.setItem('user-token', fakeToken);
            window.location.href = '/dashboard';
        } else {
            // Simulate error response
            errorMessages.value = {
                email: [],
                password: ['Invalid email or password.'],
            };
            markFieldWithError('password');
            alert('Invalid email or password.');
        }
    } else {
        // In case of invalid form, mark the fields with errors and return the corresponding error.
        for (const field in formValidationRules.value) {
            if (!formValidationRules.value[field]) {
                errorMessages.value[field] = [inputValidationErrors[field]];
                markFieldWithError(field);
            }
        }
    }
};

// Watch for changes in errorMessages array. In case of new errors, mark fields with errors and show the error message.
watch(errorMessages, (newErrors) => {
    for (const field in newErrors) {
        if (newErrors[field].length > 0) {
            markFieldWithError(field);
        }
    }
});

// Mark a field with an error for 5 seconds.
const markFieldWithError = (field) => {
    showErrors.value[field] = true;
    setTimeout(() => {
        showErrors.value[field] = false;
    }, 5000);
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-300">
        <div class="card w-full max-w-md shadow-xl bg-base-100">
            <div class="card-body">
                <h1 class="text-center text-3xl font-bold mb-8 text-blue-800">Login</h1>
                <form @submit.prevent="submitForm" class="flex flex-col gap-2">
                    <div class="form-control">
                        <div class="relative">
                            <input id="email" v-model="form.email" type="email" placeholder="Enter your email"
                                :class="['input', 'input-bordered', 'pl-10', 'w-full', { 'input-error': showErrors.email }]" />
                            <EnvelopeIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <span v-if="showErrors.email" class="text-error text-xs mt-1 block text-left">
                            {{ errorMessages.email[0] }}
                        </span>
                    </div>

                    <div class="form-control">
                        <div class="relative">
                            <input id="password" v-model="form.password" type="password"
                                placeholder="Enter your password"
                                :class="['input', 'input-bordered', 'pl-10', 'w-full', { 'input-error': showErrors.password }]" />
                            <LockClosedIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <span v-if="showErrors.password" class="text-error text-xs mt-1 block text-left">
                            {{ errorMessages.password[0] }}
                        </span>
                    </div>

                    <button type="submit" class="btn btn-outline btn-info w-full mt-2">LETS GO</button>
                </form>
                <div class="divider">OR</div>
                <div class="text-center">
                    <p class="mb-2">Don't have an account yet?</p>
                    <RouterLink to="/register">
                        <button type="button" class="btn btn-outline btn-info w-full">Register Here</button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>