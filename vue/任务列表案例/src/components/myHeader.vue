<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter='add'/>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'
    export default {
        name:'myHeader',
        data(){
            return{
                date:'myHeader的数据'
            }
        },
        //获取app的函数方便传对象
        methods:{
            add(event){
                if(!event.target.value) return alert('输入不能为空')
                //包装对象
                const todo={id:nanoid(),title:event.target.value,done:false,etid:false}
                //将对象发送给app
                this.$emit('addtodo',todo)
                //清空输入
                event.target.value=''
            }
        }
    }
</script>

<style scoped>
    /*header*/
    .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    }

    .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>