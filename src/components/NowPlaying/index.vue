<template>
    <div class="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="renew">{{pullDownMsg}}</li>
                <li v-for="item of movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)">
                        <img :src="item.img | setWH('128.180')" alt="">
                    </div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p>观众评<span>{{item.sc}}</span></p>
                        <p>主演：{{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>        
</template>

<script>
// import BScroll from 'better-scroll';
export default {
    name: 'NowPlaying',
    data () {
        return{
            movieList: [],
            pullDownMsg : '',
            isLoading: true,
            prevCityId : -1,
        }
    },

    activated () {
         console.log("我是正在热映中的页面！");
         var cityId = this.$store.state.city.id;
         if( this.prevCityId === cityId){ return ;}
         //this.isLoading = true;
         this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
            var msg = res.data.msg;
            if( msg === 'ok' ){
                this.movieList = res.data.data.movieList;
                this.isLoading = false;
                // this.$nextTick(() =>{
                //      var scroll = new BScroll(this.$refs.movie_body,{
                //          tap: true,
                //          probeType : 1,
                //      });
                //      scroll.on('scroll',(pos)=>{
                //          //console.log("哈哈哈哈哈");
                //          if( pos.y > 30){
                //              this.pullDownMsg = '正在更新中...';
                //          }
                //      });
                //      scroll.on('touchEnd',(pos) =>{
                //          //console.log("呵呵呵额呵呵额呵呵");
                //          if( pos.y > 30){
                //              this.axios.get('/api/movieOnInfoList?cityId=').then((res)=>{
                //                 var msg = res.data.msg;
                //                 if( msg === 'ok' ){
                //                     this.pullDownMsg = '更新成功...';
                //                     setTimeout(() =>{
                //                         this.movieList = res.data.data.movieList; 
                //                          this.pullDownMsg = '';
                //                     },1000);    
                //                 }
                //              });  
                //          }
                //      });
                // });
            }
        });
    },
    methods : {
        handleToDetail (movieId) {
            //console.log(movieId);
            this.$router.push('/movie/detail/1/' + movieId);
        },
        handleToScroll(pos){
            if( pos.y > 30){
            this.pullDownMsg = '正在更新中...';
            }
        },
        handleToTouchEnd(pos){
            var cityId = this.$store.state.city.id;
            if( pos.y > 30){
                 this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
                    var msg = res.data.msg;
                    if( msg === 'ok' ){
                        this.pullDownMsg = '更新成功...';
                        setTimeout(() =>{
                            this.movieList = res.data.data.movieList; 
                            this.pullDownMsg = '';
                        },1000);    
                     }
                });  
            }
        },
    }
}
</script>

<style scoped>
#content .movie_body{flex: 1;overflow: auto}
.movie_body ul{margin: 0 12px;overflow: hidden}
.movie_body ul li{margin-top: 12px;display: flex;align-items: center;border-bottom: 1px solid #e6e6e6;padding-bottom: 10px;}
.movie_body ul li.renew{width: 100px;text-align: center;margin: 0 auto;border:none;}
.movie_body .pic_show{width: 64px;height: 90px;}
.movie_body .pic_show img{width: 100%;}
.movie_body .info_list{margin-left: 10px;flex: 1;position: relative;}
.movie_body .info_list h2{font-size: 17px;line-height: 24px;width: 150px;overflow: hidden;white-space: normal;text-overflow: ellipsis}
.movie_body .info_list p{font-size: 13px;color: #666;line-height: 22px;width: 200px;overflow: hidden;white-space: normal;text-overflow: ellipsis}
.movie_body .info_list p span{margin-left:10px;color:red;}
.movie_body .info_list .grade{font-weight: 800;color:#faaf00;font-size: 15px;}
.movie_body .info_list img{width: 50px;position: absolute;right: 10px;top: 5px;}
.movie_body .btn_mall,.movie_body .btn_pre{width: 47px;height: 27px;line-height: 28px;text-align: center;background-color: #ef4238;}
.movie_body btn_pre{background-color: #3c9fe6;}
</style>
