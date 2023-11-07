<template>
    <ul class="todo-main">
        <myItem 
            v-for='todo in todo'
            :key='todo.id' :todo='todo'
            ></myItem>
    </ul>
</template>

<script>
    import myItem from './myItem.vue'
    export default {
        name:'myList',
        props:['todo'],
        components:{
            myItem:myItem
        }
    }
</script>

<style scoped>
    /*main*/
    .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
    }

    .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
    }
</style>