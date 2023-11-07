<template>
    <div>
        <ul>
          <li v-for='a in list' :key='a.id'>
              <!-- 写法一 -->
            <!-- <router-link :to="`/home/message/detail?id=${a.id}&title=${a.title}`">{{a.title}}</router-link>&nbsp;&nbsp; -->
            <!-- 写法二 -->
            <router-link :to="{
                path:'/home/message/detail',
                query:{id:a.id,title:a.title}
            }">{{a.title}}
            </router-link>
            <!-- 可以用name:'nr'代替path:'/home/message/detail' -->
          </li>
        </ul>
        <router-view></router-view>
      </div>
</template>
<script>
    export default{
        name:'Message',
        data(){
            return{
                list:[
                    {id:'001',title:'消息001'},
                    {id:'002',title:'消息002'},
                    {id:'003',title:'消息003'},
                ]
            }
        }
    }
</script>
<style>
</style>