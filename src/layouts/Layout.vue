<script setup>
import Header from '@/components/Header.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <Header />
    <div style="padding-top: 64px;">
        <RouterView />
    </div>
</template>

<style scoped></style>