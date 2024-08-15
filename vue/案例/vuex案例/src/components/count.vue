<template>
    <div>
        <h1>当前总和为:{{sum}}</h1><!-- 使用了mapState -->
        <h1>总和的10倍:{{bigSum}}</h1><!-- 使用了mapGetters -->
        <select v-model.number='num'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
        </select>
        <button @click="JIA(num)">+</button><!-- 使用了mapMutations -->
        <button @click="JIAN(num)">-</button><!-- 使用了mapMutations -->
        <button @click="jiaJishu(num)">为为奇数时加</button><!-- 使用了mapActions -->
        <button @click="jiaWait(num)">过会加</button><!-- 使用了mapActions -->
    </div>
</template>
<script>
    //如果要用的话记得引入4个map方法
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name:'count',
        data(){
            return{
                num:1,
            }
        },
        computed:{
            //借助mapState算法从state中读取数据
            ...mapState(['sum']),
            //借助mapGetters算法从state中读取数据
            ...mapGetters(['bigSum'])
        },
        methods:{
            // jia(){
            //     //直接找mutations处理数据
            //     this.$store.commit('JIA',this.num)
            // },
            // jian(){
            //     //直接找mutations处理数据
            //     this.$store.commit('JIAN',this.num)
            // },

            //借助mapMutations生成对应方法，该方法会调用commit去联系mutations
            ...mapMutations(['JIA','JIAN','UPDATA','DOWNDATA']),

            // jiaJishu(){
            //     //经过actions再找mutations处理数据
            //     this.$store.dispatch('jiaJishu',this.num)
            // },
            // jiaWait(){
            //     //经过actions再找mutations处理数据
            //     this.$store.dispatch('jiaWait',this.num)
            // },

            //借助了mapActions生成对应方法，该方法会调用dispatch去联系actions
            ...mapActions(['jiaJishu','jiaWait']),
        },
        watch:{
            //深度监视sum的变化，并更新本地存储
            sum:{
                handler(){
                    this.UPDATA()
                }
            }
        },
        mounted(){
            this.DOWNDATA()
        }
    }
</script>

<style scoped>
    *{
        margin: 5px;
    }
</style>