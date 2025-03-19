<template>
    <div class="users-list">
        <h2>Users List</h2>

        <div v-if="loading" class="users-list__loading">
            Loading users...
        </div>
        
        <div v-else-if="usersError" class="users-list__error">
            {{ usersError }}
        </div>

        <ul v-else class="users-list__items">
            <UserCard v-for="user in users" :key="user.id" :user="user" />
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([])
const loading = ref(true)
const usersError = ref(null)

const fetchUsers = async () => {
    try {
        usersError.value = null

        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        
        if (!response.ok) {
           throw new Error('Failed to fetch users')
        }

        users.value = await response.json()
    } catch (error) {
        usersError.value = error?.message || error
        console.error('Error fetching users:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchUsers()
})
</script>