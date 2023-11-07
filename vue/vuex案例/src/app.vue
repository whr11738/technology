<template>
    <div>
        <count></count>
    </div>
</template>

<script>
    import count from './components/count.vue'
    export default {
        name:'app',
        components:{
            count,
        },
        // mounted(){
        //     console.log(this);
        // }
    }
</script>

<style>
</style>