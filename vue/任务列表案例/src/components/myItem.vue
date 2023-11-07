<template>
    <li>
        <label>
          <input 
            type="checkbox"
            :checked='todo.done'
            @click='handlecheck(todo.id)'
            />
          <span v-show='!todo.etid'>{{todo.title}}</span>
          <input v-show='todo.etid' type="type" :value='todo.title' ref='newetid'>
        </label>
        <button class="btn btn-danger" @click='deltodo'>删除</button>
        <button v-show='!todo.etid' class="btn btn-etid" @click='isetid'>修改</button>
        <button v-show='todo.etid' class="btn btn-etid" @click='endtodo'>完成</button>
    </li>
</template>

<script>
    export default {
        name:'myItem',
        props:['todo'],
        methods:{
        //勾选框按钮
        handlecheck(id){
            this.$bus.$emit('changetodo',id)
        },
        //删除按钮
        deltodo(){
            this.$bus.$emit('delthetodo',this.todo.id)
        },
        //开始编辑
        isetid(){
            this.todo.etid=true
        },
        //结束编辑
        endtodo(){
            this.todo.etid=false
            if(this.$refs.newetid.value=='')return alert('不能为空')
            this.$bus.$emit('etidtodo',this.todo.id,this.$refs.newetid.value)
        }
    }
    }
</script>

<style scoped>
    /*item*/
    li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    }

    li label {
    float: left;
    cursor: pointer;
    }

    li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
    }

    li button {
    float: right;
    display: none;
    margin-top: 3px;
    }

    li:before {
    content: initial;
    }

    li:last-child {
    border-bottom: none;
    }

    li:hover {
        background-color: #ddd;
    }

    li:hover button {
        display: block;
    }
</style>