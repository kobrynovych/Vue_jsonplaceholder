import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
    const users = ref([])
    const loading = ref(false)
    const usersError = ref(null)

    const fetchUsers = async () => {
        loading.value = true
        usersError.value = null

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            
            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }

            users.value = await response.json()
        } catch (error) {
            usersError.value = error?.message || error
        } finally {
            loading.value = false
        }
    }

    return {
        users,
        loading,
        usersError,
        fetchUsers,
    }
})