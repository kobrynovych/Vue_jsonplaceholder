<template>
    <AppLayout>
        <div v-for="i in 40" :key="i">
            <div>{{ i }}</div>            
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from './Layouts/AppLayout.vue'
</script>
