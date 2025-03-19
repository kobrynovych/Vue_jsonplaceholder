<template>
    <div class="app-layout">
        <Header />

        <div class="app-layout__content-wrap container">
            <main class="app-layout__content">
                <slot></slot>
            </main>

            <Sidebar />
        </div>
                
        <Footer />
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Sidebar from '../components/Sidebar.vue'
</script>
