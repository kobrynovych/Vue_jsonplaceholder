<template>
    <li class="user-card">
        <h3>{{ user.name }}</h3>
        
        <button 
            @click="onToggleUserDetails()" 
            class="user-card__details-button"
        >
            {{ isShowDetails ? 'Hide Details' : 'Show Details' }}
        </button>

        <Transition
            name="slide"
            @enter="el => el.style.height = el.scrollHeight + 'px'"
            @leave="el => el.style.height = '0'"
        >
            <div 
                v-if="isShowDetails" 
                class="user-card__user-details-container"
            >
                <div class="user-card__user-details">
                    <p><b>Email:</b> {{ user.email }}</p>
                    <p><b>Phone:</b> {{ user.phone }}</p>
                </div>
            </div>
        </Transition>
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