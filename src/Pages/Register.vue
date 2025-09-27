<script setup>

// Import node modules and elements. 
import axios from 'axios';
import { ref, computed, watch } from 'vue';

// Store all input errors in an array.
const errorMessages = ref([]);

// Declare form data input fields.
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    education_start_date: '',
    education_end_date: '',
    terms: false,
})

// Show when a form input has an error.
const showErrors = ref({
    name: false,
    email: false,
    password: false,
    password_confirmation: false,
    education_start_date: false,
    education_end_date: false,
    terms: false,
});

// Create validation input check rules.
const formValidationRules = computed(() => ({
    name: form.value.name.trim().length > 0,
    email: /\S+@\S+\.\S+/.test(form.value.email),
    password: form.value.password.length >= 6,
    password_confirmation: form.value.password === form.value.password_confirmation,
    education_start_date: form.value.education_start_date !== '',
    education_end_date:
        form.value.education_end_date !== '' &&
        form.value.education_end_date > form.value.education_start_date,
    terms: form.value.terms,
}));

// Check if we have any error in the form by returning true values.
const isFormValid = computed(() =>
    Object.values(formValidationRules.value).every(Boolean)
);

// Create validation input error  messages. 
const inputValidationErrors = {
    email: 'Please enter a valid email address.',
    password: 'Password must be at least 6 characters long.',
    password_confirmation: 'Passwords do not match.',
    name: 'Name is required.',
    education_start_date: 'Start date is required.',
    education_end_date: 'End date must be after start date.',
    terms: 'You must accept the terms and conditions.',
};

// Make request.
const submitForm = () => {
    // Check first if the form is valid.
    if (isFormValid.value) {
        console.log('Form submitted:', form.value);

        // If the response is successful, store the token in localstorage and redirect to dashboard.
        if (response.data.accessToken) {
            localStorage.setItem('user-token', response.data.accessToken);
            window.location.href = '/dashboard';
        } else {
            console.error('Registration failed:', response.data);
        }

        ;
    } else {
        console.log('Form is invalid. Please correct the errors and try again.');

        // In case the input is invalid, mark the error fields and return the corresponding error. 
        for (const field in formValidationRules.value) {
            if (!formValidationRules.value[field]) {
                errorMessages.value[field] = [inputValidationErrors[field]];
                markFieldWithError(field);
            }
        }
    }
}

// Watch for changes in errorMessages and mark with errors each field in case of new errors.
watch(errorMessages, (newErrors) => {
    for (const field in newErrors) {
        if (newErrors[field].length > 0) {
            markFieldWithError(field, newErrors);
        }
    }
});

// Set the fields with errors for 5 seconds.
const markFieldWithError = (field) => {
    showErrors.value[field] = true;
    setTimeout(() => {
        showErrors.value[field] = false;
    }, 5000);
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-300">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-center text-3xl font-bold mb-8 text-blue-800">Register</h1>
            <form @submit.prevent="submitForm" class="register-form flex flex-col gap-5">

                <fieldset class="form-control">
                    <legend class="label-text text-blue-700 font-semibold mb-1">Name</legend>
                    <input id="name" v-model="form.name" type="text" :class="[
                        'input input-bordered w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
                        showErrors.name ? 'input-error border-red-500' : ''
                    ]" />
                    <span v-if="showErrors.name" class="text-error text-xs mt-1 block text-left">{{
                        errorMessages.name[0]
                        }}</span>
                </fieldset>

                <fieldset class="form-control">
                    <legend class="label-text text-blue-700 font-semibold mb-1">Email</legend>
                    <input id="email" v-model="form.email" type="email" :class="[
                        'input input-bordered w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
                        showErrors.email ? 'input-error border-red-500' : ''
                    ]" />
                    <span v-if="showErrors.email" class="text-error text-xs mt-1 block text-left">{{
                        errorMessages.email[0]
                    }}</span>
                </fieldset>

                <fieldset class="form-control">
                    <legend class="label-text text-blue-700 font-semibold mb-1">Password</legend>
                    <input id="password" v-model="form.password" type="password" :class="[
                        'input input-bordered w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
                        showErrors.password ? 'input-error border-red-500' : ''
                    ]" />
                    <span v-if="showErrors.password" class="text-error text-xs mt-1 block text-left">{{
                        errorMessages.password[0]
                        }}</span>
                </fieldset>

                <fieldset class="form-control">
                    <legend class="label-text text-blue-700 font-semibold mb-1">Confirm Password</legend>
                    <input id="password_confirmation" v-model="form.password_confirmation" type="password" :class="[
                        'input input-bordered w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
                        showErrors.password_confirmation ? 'input-error border-red-500' : ''
                    ]" />
                    <span v-if="showErrors.password_confirmation" class="text-error text-xs mt-1 block text-left">{{
                        errorMessages.password[0]
                        }}</span>
                </fieldset>

                <fieldset class="form-control">
                    <legend class="label-text text-blue-700 font-semibold mb-1">Education Start Date</legend>
                    <input type="date" id="education_start_date" v-model="form.education_start_date" :class="[
                        'input w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
                        showErrors.education_start_date ? 'input-error border-red-500' : ''
                    ]" />
                    <span v-if="showErrors.education_start_date" class="text-error text-xs mt-1 block text-left">{{
                        errorMessages.education_start_date[0]
                        }}</span>
                </fieldset>

                <fieldset class="form-control">
                    <legend class="label-text text-blue-700 font-semibold mb-1">Education End Date</legend>
                    <input id="education_end_date" v-model="form.education_end_date" type="date" :class="[
                        'input w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
                        showErrors.education_end_date ? 'input-error border-red-500' : ''
                    ]" />
                    <span v-if="showErrors.education_end_date" class="text-error text-xs mt-1 block text-left">{{
                        errorMessages.education_end_date[0]
                    }}</span>
                </fieldset>

                <fieldset class="form-control flex flex-col items-center">
                    <label class="cursor-pointer  flex items-center gap-2 justify-center">
                        <input type="checkbox" v-model="form.terms" class="checkbox accent-blue-600" />
                        <span class="text-blue-700">Accept Terms and Conditions</span>
                    </label>
                    <span v-if="showErrors.terms" class="text-error text-xs mt-1 block text-left">{{
                        inputValidationErrors.terms
                        }}</span>
                </fieldset>

                <button type="submit"
                    class="btn btn-info w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Register</button>
            </form>
            <div class="divider">OR</div>
            <div class="mt-4 text-left justify-center flex">
                <button class="text-blue-600 hover:underline font-medium" @click="$router.push('/login')" type="button">
                    Having an account? Click to log in
                </button>
            </div>
        </div>
    </div>
</template>
