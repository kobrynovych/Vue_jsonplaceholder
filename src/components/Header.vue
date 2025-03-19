<template>
    <header 
        class="header container"
        :class="{ 
            'header-hidden': isHeaderHidden,
        }"
    >
        <router-link to="/" class="header__link">Header</router-link>

        <NavBar />
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './NavBar.vue'

const isHeaderHidden = ref(false)
const lastScrollTop = ref(0)

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    if (scrollTop > lastScrollTop.value) {
        isHeaderHidden.value = true
    } else {
        isHeaderHidden.value = false
    }
    
    lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
