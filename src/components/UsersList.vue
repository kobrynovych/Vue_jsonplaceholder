<template>
    <div class="users-list">
        <h2>Users List</h2>

        <div v-if="store.loading" class="users-list__loading">
            Loading users...
        </div>
        
        <div v-else-if="store.usersError" class="users-list__error">
            {{ store.usersError }}
        </div>

        <ul v-else class="users-list__items">
            <UserCard v-for="user in store.users" :key="user.id" :user="user" />
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import UserCard from './UserCard.vue'
import { useUsersStore } from '../stores/users'

const store = useUsersStore()

onMounted(() => {
    if (!store.users.length) {
        store.fetchUsers()
    }
})
</script>