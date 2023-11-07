<template>
    <div id="root">
        <div class="todo-container">
          <div class="todo-wrap">
            <myHeader @addtodo='addtodo'></myHeader>
            <myList :todo='todo'></myList>
            <myFooter :todo='todo' @checkAlltodo='checkAlltodo' @clearalltodo='clearalltodo'></myFooter>
          </div>
        </div>
    </div>
</template>

<script>
    import myHeader from './components/myHeader'
    import myList from './components/myList.vue'
    import myFooter from './components/myFooter.vue'
    export default {
        name:'app',
        components:{
            myHeader:myHeader,
            myList:myList,
            myFooter:myFooter
        },
        data(){
            return{
                todo:JSON.parse(localStorage.getItem('todo'))||[]
            }
        },
        methods:{
            //接受对象并完善数据
            addtodo(x){
                this.todo.unshift(x)
            },
            //删除对应数据
            delthetodo(id){
                this.todo=this.todo.filter((todo)=>{
                    return todo.id !== id
                })
            },
            //修改内容
            etidtodo(id,newetid){
                this.todo.forEach((todo)=>{
                    if(todo.id===id){
                        todo.title=newetid
                    }
                })
            },
            //操作勾选框
            changetodo(id){
                this.todo.forEach((todo)=>{
                    if(todo.id===id){
                        todo.done=!todo.done
                    }
                })
            },
            //是否全选
            checkAlltodo(done){
                this.todo.forEach((todo)=>{
                    todo.done=done
                })
            },
            //清除已完成
            clearalltodo(){
                this.todo=this.todo.filter((todo)=>{
                    return !todo.done
                })
            }
        },
        watch:{
            //深度监视todo的变化，并更新本地存储
            todo:{
                deep:true,
                handler(value){
                    localStorage.setItem('todo',JSON.stringify(value))
                }
            }
        },
        //绑定全局事件
        mounted(){
            this.$bus.$on('changetodo',this.changetodo)
            this.$bus.$on('delthetodo',this.delthetodo)
            this.$bus.$on('etidtodo',this.etidtodo)
        },
        //清除全局事件
        destroyed(){
            this.$bus.$off("changetodo")
            this.$bus.$off("delthetodo")
            this.$bus.$off("etidtodo")
        }
    }
</script>

<style>
    /*base*/
    body {
    background: #fff;
    }

    .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    }

    .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
    }

    .btn-etid {
    color: #fff;
    background-color:skyblue;
    border: 1px solid rgb(113, 173, 197);
    margin-right: 8px;
    }

    .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
    }

    .btn:focus {
    outline: none;
    }

    .todo-container {
    width: 600px;
    margin: 0 auto;
    }
    .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    }
</style>