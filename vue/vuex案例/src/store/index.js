import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//响应组件中的动作
const actions={
    jia(context,value){
        context.commit('JIA',value)
    },
    jian(context,value){
        context.commit('JIAN',value)
    },
    jiaJishu(context,value){
        if(state.sum%2){
            context.commit('JIA',value)
        }
    },
    jiaWait(context,value){
        setTimeout(()=>{
            context.commit('JIA',value)
        },1000)
    },
    
}
//操作数据
const mutations={
    //加
    JIA(state,value){
        state.sum+=value
    },
    //减
    JIAN(state,value){
        state.sum-=value
    },
    //本地存数据
    UPDATA(){
        localStorage.setItem('sum',JSON.stringify(state.sum))
    },
    //从本地取数据
    DOWNDATA(){
        if(localStorage.getItem('sum')==null){
            localStorage.setItem('sum',JSON.stringify(state.sum))
        }
        state.sum=JSON.parse(localStorage.getItem('sum'))
    }
}
//存储数据
const state={
    sum:0
}
//加工state的数据
const getters={
    bigSum(state){
        return state.sum*10
    }
}
//创建storm
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})