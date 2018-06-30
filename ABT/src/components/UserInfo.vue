//用户信息

<template>
<div class="info">
  <div class="portrait"><img:src="" width="80" height="80" /></div>

  <div class="user-info">
    <div class="uid" >用户名:{{$store.state.username}}</div>
    <div class="uid" >ID:{{$store.state.token}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserInfo',
  data(){
    return {}
  },
}
</script>

<style scoped>
.info{background: #fff; width: 300px; height: 180px; text-align: left;}
.portrait{width: 80px; height: 80px; overflow:hidden; -webkit-border-radius: 40px;
-moz-border-radius: 40px;
-ms-border-radius: 40px;
-o-border-radius: 40px;
border-radius: 40px; background-color: #CCCCCC; margin: 40px 18px 0 15px;}
.user-info{margin: 38px 0 0 0; vertical-align: top;}
.portrait, .user-info{display: inline-block;}
.uid{margin-top: 14px;font-size: 13px;}
</style>