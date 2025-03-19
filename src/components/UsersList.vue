<template>
    <div class="users-list">
        <h2>Users List</h2>

         <!-- Search and Sort Controls -->
        <div class="users-list__controls">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
                class="users-list__controls-search"
            />

            <div class="users-list__sort">
                <button
                    class="users-list__sort-btn"
                    :class="{ 
                        'users-list__sort-btn--active': sortBy === 'name', 
                    }"
                    @click="handleSort('name')"
                >
                    Sort by Name
                    <span v-if="sortBy === 'name'">
                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </span>
                </button>

                <button
                    class="users-list__sort-btn"
                    :class="{ 
                        'users-list__sort-btn--active': sortBy === 'email', 
                    }"
                    @click="handleSort('email')"
                >
                    Sort by Email
                    <span v-if="sortBy === 'email'">
                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </span>
                </button>
            </div>
        </div>

        <div v-if="store.loading" class="users-list__loading">
            Loading users...
        </div>
        
        <div v-else-if="store.usersError" class="users-list__error">
            {{ store.usersError }}
        </div>

        <transition-group v-else name="users" tag="ul" class="users-list__items">
            <UserCard v-for="user in filteredAndSortedUsers" :key="user.id" :user="user" />
        </transition-group>

        <div 
            v-if="!store.loading && !store.usersError && filteredAndSortedUsers.length === 0" 
            class="users-list__no-results"
        >
            No users found matching your search.
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import UserCard from './UserCard.vue'
import { useUsersStore } from '../stores/users'

const store = useUsersStore()

const searchQuery = ref('')
const sortBy = ref('name')
const sortOrder = ref('asc')

onMounted(() => {
    if (!store.users.length) {
        store.fetchUsers()
    }
})

const filteredAndSortedUsers = computed(() => {
    let users = store.users
        
    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        users = users.filter(user => user.name.toLowerCase().includes(query))
    }
    
    // Sorting
    return [...users].sort((a, b) => {
        const aValue = a[sortBy.value];
        const bValue = b[sortBy.value];
        const modifier = sortOrder.value === 'asc' ? 1 : -1;
        
        return aValue > bValue ? modifier : -modifier;
    });
})

const handleSort = (field) => {
    if (sortBy.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = field;
        sortOrder.value = 'asc';
    }
}
</script>