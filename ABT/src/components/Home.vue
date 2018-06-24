<template>
 <p class="hello">
  <ul>
   <li v-for="(item,index) in indents" :key="item._id">
    {{ index + 1 }}.{{ item.username }}
    <el-button @click="view_Indent(index)">删除</el-button>
   </li>
  </ul>
  <el-button type="primary" @click="logout()">注销</el-button>
 </p>
</template>
<script>
import axios from '../axios.js'
export default {
 name: 'Home',
 data () {
  return {
   indents:''
  }
 },
 created(){
  axios.getIndent(this.$store.state.username).then((response) => {
   if(response.status === 401){
    //不成功跳转回登录页
    this.$router.push('/login');
    //并且清除掉这个token
    this.$store.dispatch('UserLogout');
   }else{
    //成功了就把data.result里的数据放入users，在页面展示
    this.indents = response.data.indents;
   }
  })
 }, 
 methods:{
  view_Indent(index, event){
   
  },
  logout(){
   //清除token
   this.$store.dispatch('UserLogout');
   if (!this.$store.state.token) {
    this.$router.push('/login')
    this.$message({
     type: 'success',
     message: '注销成功'
    })
   } else {
    this.$message({
     type: 'info',
     message: '注销失败'
    })
   }
  },
 }
}
</script>
<style scoped>
h1, h2 {
 font-weight: normal;
}
ul {
 list-style-type: none;
 padding: 0;
}
li {
 display: inline-block;
 margin: 0 10px;
}
a {
 color: #42b983;
}
.hello {
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 width: 400px;
 margin: 60px auto 0 auto;
}
</style>