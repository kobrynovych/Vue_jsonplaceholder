<template>
    <li class="user-card">
        <h3>{{ user.name }}</h3>
        
        <button 
            @click="onToggleUserDetails()" 
            class="user-card__details-button"
        >
            {{ isShowDetails ? 'Hide Details' : 'Show Details' }}
        </button>

        <div 
            v-if="isShowDetails" 
            class="user-card__user-details"
        >
            <p><b>Email:</b> {{ user.email }}</p>
            <p><b>Phone:</b> {{ user.phone }}</p>
        </div>
    </li>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        default: () => [],
    },
})

const isShowDetails = ref(false)

const onToggleUserDetails = () => {
    isShowDetails.value = !isShowDetails.value
}
</script>