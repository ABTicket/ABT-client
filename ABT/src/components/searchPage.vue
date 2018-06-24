<template>  
  <div class="come-soon">
    <v-header></v-header>
    <spinner v-if='guodu'></spinner>
    <div v-if='!guodu' class="co-theaters-area">
      <div class="co-movies-wrap" >
          <div class="co-movies-show" v-for="(item, index) in coming_soon_data_body_subjects" @click="showMoreMsg(item.id)">
          <div class="co-movies-show-child">
            <div class="co-posters"><img :src="getImage(item.images.small)" :alt="item.alt"></div>
            <div class="co-movieMsg">
              <h2>{{ item.title }}</h2>
              <p v-if="item.directors[0]">导演: {{ item.directors[0].name}}</p>
              <p>
                主演:<span v-if="item.casts[0]">, {{ item.casts[0].name }}</span>
                <span v-if="item.casts[1]">, {{ item.casts[1].name }}</span>
              </p>
              <p>类型: {{item.genres.join(', ')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from './spinner/spinner'
import vHeader from './header/header'
import axios from 'axios'
export default {
  data () {
    return {
      coming_soon_data: {},
      coming_soon_data_body: {},
      coming_soon_data_body_subjects: [],
      guodu: true
    }
  },
  components: {
    spinner: spinner,
    'v-header': vHeader
  },
  mounted: function () {
    let _this = this;  
    let sw = true;
    this.updateSearch();
  },
  methods: {
    updateSearch(){
      this.val = this.$route.query.name

      var url = this.HOST + '/movie/'+ 'search?q=' + this.val
      axios.get(url).then(res => {
       this.guodu = false; 
       this.coming_soon_data_body_subjects = res.data.subjects;
      },res => {
      console.info('调用失败');
      });
    },
    showMoreMsg: function (str) {
      this.$router.push({path: '/MovieMsg',query:{id: str}});
    },
      getImage(url){
        console.log(url);
        if(url !== undefined){
          return 'https://images.weserv.nl/?url='+url.substring(7);
        }
      }
  }

}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  .co-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .co-movies-show {
    background-color: #f8f8f8;
    cursor: pointer;
    font-size: 0;
    padding: 10px 20px;
  }
  .co-movies-show-child {
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #d6d6d6;
  }
  .co-movieMsg {
    flex: 1;
    padding-left: 20px;
    vertical-align: top;
  }
  .co-movieMsg h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .co-movies-show p {
    font-size: 14px;
    color: #666;
  }
</style>