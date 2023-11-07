<template>
    <div class="todo-footer" v-if='todo.length'>
        <label>
          <input type="checkbox" :checked='todo.length==donetodo' @click='checkAll'/>
        </label>
        <span>
          <span>已完成{{donetodo}}</span> / 全部{{todo.length}}
        </span>
        <button class="btn btn-danger" @click='clearall'>清除已完成任务</button>
    </div>
</template>
<script>
    
    export default {
        name:'myFooter',
        props:['todo'],
        computed:{
            //全勾时全选亮
            donetodo(){
                return this.todo.reduce((pre,todo)=>pre+(todo.done?1:0),0)
            }
        },
        methods:{
            checkAll(e){
                this.$emit('checkAlltodo',e.target.checked)
            },
            clearall(){
                this.$emit('clearalltodo')
            }
        }
    }
</script>

<style scoped>
    /*footer*/
    .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
    }

    .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    }

    .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
    }

    .todo-footer button {
    float: right;
    margin-top: 5px;
    }
</style>