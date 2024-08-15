<template>
    <div>
        <ul>
            <!-- 用query接参数 -->
            <li>{{$route.query.id}}</li>
            <li>{{$route.query.title}}</li>
        </ul>
      </div>
</template>
<script>
    export default{
        name:'Detail'
    }
</script>
<style>
</style>