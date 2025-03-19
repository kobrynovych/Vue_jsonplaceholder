<template>
    <aside class="sidebar">
        <div v-for="i in 50" :key="i">
            <div>{{ i }}</div>            
        </div>
    </aside>
</template>