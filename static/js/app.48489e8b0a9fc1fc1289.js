webpackJsonp([2,0],{0:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var s=o(163),n=a(s),r=o(484),i=a(r),c=o(492),u=a(c),f=o(164),p=a(f),l=o(166),d=a(l);n["default"].use(u["default"]),n["default"].http.options.root="https://api.douban.com",n["default"].use(p["default"]);var h=new p["default"]({hashbang:!0,history:!1,saveScrollPosition:!0,transitionOnLoad:!0});h.map(d["default"]),h.redirect({"*":"/"}),h.start(i["default"],"#app")},165:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(174),n=a(s),r=o(176),i=a(r),c=o(175),u=a(c),f=o(163),p=a(f),l="https://api.douban.com/v2",d=2592e5;e["default"]={fetchBooks:function(t,e,o){var a=(new Date).getTime(),s={},n=this;if(s=window.localStorage.getItem(t.userID),s&&(s=JSON.parse(s),s.timeStamp+d>a))return void e(s);var r={count:1};(0,u["default"])(r,t),this.getBook(r).then(function(a){for(var s=[],r=0,c=a.total;r<c;r+=100)s.push(r);var f=s.map(function(e){var o={start:e,count:100};return(0,u["default"])(o,t),p["default"].http.jsonp(l+"/book/user/"+o.userID+"/collections",o).then(function(t){if(200===t.status)return t.data})});i["default"].all(f).then(function(o){for(var s={collections:[],total:0},r=0,i=o.length;r<i;r++)for(var c=o[r].collections,u=0,f=c.length;u<f;u++)s.collections.push(c[u]);s.total=a.total,s=n.formatDataForChart(s,t.userID),e(s)})["catch"](function(t){o(t)})})},getBook:function(t){var e={count:100};(0,u["default"])(e,t);var o=new i["default"](function(t,o){p["default"].http.jsonp(l+"/book/user/"+e.userID+"/collections",e).then(function(e){if(200===e.status){var o=e.data;o.current=o.start+o.count,t(o)}})["catch"](function(t){o(t)})});return o},formatDataForChart:function(t,e){var o=(new Date).getTime(),a=t.collections,s={};return a.forEach(function(t){var e=t.updated.substring(0,7).split("-"),o=e[0],a=Number(e[1]);s[o]||(s[o]={}),s[o].collections||(s[o].collections=[]),s[o].collections.push(t),s[o].books||(s[o].books={}),s[o].books[t.status]||(s[o].books[t.status]=[]),s[o].books[t.status].push(t),s[o].status||(s[o].status={}),s[o].status[t.status]||(s[o].status[t.status]=[]);for(var n=0;n<12;n++)s[o].status[t.status][n]||(s[o].status[t.status][n]=null);if(s[o].status[t.status][a-1]++,"read"===t.status){s[o].rating||(s[o].rating={}),void 0===t.rating&&(t.rating={},t.rating.value="no-rating"),s[o].rating[t.rating.value]||(s[o].rating[t.rating.value]=[]);for(var r=0;r<12;r++)s[o].rating[t.rating.value][r]||(s[o].rating[t.rating.value][r]=null);s[o].rating[t.rating.value][a-1]++}}),s.timeStamp=o,window.localStorage.setItem(e,(0,n["default"])(s)),s}}},166:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(489),n=a(s),r=o(488),i=a(r),c=o(490),u=a(c);e["default"]={"":{component:n["default"]},home:{component:n["default"]},"/book":{component:i["default"]},"/unknown":{component:u["default"]}}},167:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(212),n=a(s),r=["legendselectchanged","legendselected","legendunselected","datazoom","datarangeselected","timelinechanged","timelineplaychanged","restore","dataviewchanged","magictypechanged","pieselectchanged","pieselected","pieunselected","mapselectchanged","mapselected","mapunselected"],i=["click","dblclick","mouseover","mouseout","mousedown","mouseup","globalout"];e["default"]={props:["options","theme","initOptions","group"],data:function(){return{chart:null}},computed:{width:{cache:!1,getter:function(){return this.chart.getWidth()}},height:{cache:!1,getter:function(){return this.chart.getHeight()}},isDisposed:{cache:!1,getter:function(){return this.chart.isDisposed()}}},methods:{mergeOptions:function(t){this.chart.setOption(t)},resize:function(){this.chart.resize()},dispatchAction:function(t){this.chart.dispatchAction(t)},showLoading:function(){this.chart.showLoading()},hideLoading:function(){this.chart.hideLoading()},getDataURL:function(){return this.chart.getDataURL()},clear:function(){this.chart.clear()},dispose:function(){this.chart.dispose()}},ready:function(){var t=this,e=n["default"].init(this.$el,this.theme,this.initOptions);e.setOption(this.options),this.$watch("options",function(t){e.setOption(t,!0)},{deep:!0}),e.group=this.group,this.$watch("group",function(t){e.group=t}),r.forEach(function(o){e.on(o,function(e){t.$dispatch(o,e)})}),i.forEach(function(o){e.on(o,function(e){t.$dispatch("chart"+o,e)})}),this.chart=e},connect:function(t){"string"!=typeof t&&(t=t.map(function(t){return t.chart})),n["default"].connect(t)},disconnect:function(t){n["default"].connect(t)},registerMap:function(t,e,o){n["default"].registerMap(t,e,o)},registerTheme:function(t,e){n["default"].registerTheme(t,e)}}},168:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),o(467);var s=o(487),n=a(s),r=o(486),i=a(r);e["default"]={components:{"app-header":n["default"],"app-footer":i["default"]}}},169:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(491),n=a(s);e["default"]={components:{chart:n["default"]},props:{chartData:{type:Object,required:!0,"default":{}}}}},170:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={}},171:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(493),n=o(485),r=a(n),i=o(165),c=a(i),u="",f="https://api.douban.com/v2",p="2016";e["default"]={components:{spinner:s.spinner,chart:r["default"]},created:function(){},ready:function(){var t=this,e=this;this.$refs.spinner.show(),u=this.$route.query.userid,e.setUser(),c["default"].fetchBooks({userID:u},function(o){e.setStatistics(o),e.setTagsInfo(o),e.setBooksChart(o),e.setBooksRatingsChart(o),t.$refs.spinner.hide()},function(t){console.log(t)})},data:function(){return{booksTotal:0,user:{},firstRead:{},lastRead:{},readTime:{},years:[],tags:[],chartData:{statu:{},rating:{}},readYear:""}},methods:{setStatistics:function(t){var e=t[p].books.read,o=this,a={},s=0,n=e.length,r=e[n-1],i=e[0];a.firstReadDay=r.updated.substring(0,10),a.lastReadDay=i.updated.substring(0,10),s=new Date(a.lastReadDay).getTime()-new Date(a.firstReadDay).getTime(),a.allReadDay=s/864e5,a.averageDay=(a.allReadDay/n).toFixed(2),o.booksTotal=n,o.firstRead=r,o.lastRead=i,o.readTime=a,o.readYear=p},setBooksChart:function(t){var e={title:{text:p+"年度图书阅读统计",left:"center",bottom:25},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["在读","想读","已读"]},grid:{left:"0",width:"100%",containLabel:!0},xAxis:[{type:"category",data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}],yAxis:[{type:"value"}],series:[{name:"在读",type:"bar",stack:"读书状态",data:t[p].status.reading},{name:"想读",type:"bar",stack:"读书状态",data:t[p].status.wish},{name:"已读",type:"bar",stack:"读书状态",data:t[p].status.read}]};this.chartData.statu=e},setBooksRatingsChart:function(t){var e={title:{text:p+"年度图书评价统计",left:"center",bottom:25},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["未评","一星","二星","三星","四星","五星"]},grid:{left:"0",width:"100%",containLabel:!0},xAxis:[{type:"category",data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}],yAxis:[{type:"value"}],series:[{name:"未评",type:"bar",stack:"星级评价",data:t[p].rating["no-rating"]},{name:"一星",type:"bar",stack:"星级评价",data:t[p].rating[1]},{name:"二星",type:"bar",stack:"星级评价",data:t[p].rating[2]},{name:"三星",type:"bar",stack:"星级评价",data:t[p].rating[3]},{name:"四星",type:"bar",stack:"星级评价",data:t[p].rating[4]},{name:"五星",type:"bar",stack:"星级评价",data:t[p].rating[5]}]};this.chartData.rating=e},setUser:function(){var t=this;t.$http.jsonp(f+"/user/"+u).then(function(e){if(200===e.status){var o=e.data;if(!o)return!1;t.user=o}},function(e){t.loadFaild()})},setTagsInfo:function(t){t=t[p];var e=[],o=this;t.collections.forEach(function(t){var o=t.tags;o&&o.forEach(function(t){e.indexOf(t)===-1&&e.push(t)})}),o.tags=e},loadFaild:function(){this.$refs.spinner.hide(),this.$router.go("unknown")}}}},172:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={data:function(){return{userurl:""}},ready:function(){var t=this,e=/^https:\/\/www.douban.com\/people\/\d+|\w+\d+|\w+\/$/;this.$watch("userurl",function(o){if(e.test(o)){var a="";o=o.replace(/https:\/\/www.douban.com\/people\//,""),a=o.substr(0,o.length-1),t.$router.go({path:"book",query:{userid:a}})}})}}},173:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={methods:{goBack:function(t){this.$router.go(window.history.back())}}}},467:function(t,e){},468:function(t,e){},469:function(t,e){},470:function(t,e){},471:function(t,e){},472:function(t,e){},473:function(t,e){},474:function(t,e){},475:function(t,e){},476:function(t,e){t.exports=" <div class=echarts></div> "},477:function(t,e){t.exports=" <div class=container> <router-view></router-view> <app-footer></app-footer> </div> "},478:function(t,e){t.exports=" <footer> <p class=copyright>Copyright © 2016 <a href=http://zhengbowei.github.io/about title=关于我>Bowei Zheng.</a> Hosted by <a href=https://github.com/zhengbowei/douban_stat target=_blank title=github rel=nofollow>GitHub</a> and powered by <a href=http://vuejs.org.cn/ title=Vue.js官网 rel=nofollow>Vue.js</a>.</p> </footer> "},479:function(t,e){t.exports=' <div class=content _v-00f2f2e0=""> <p class=title _v-00f2f2e0=""><strong _v-00f2f2e0="">输入你的豆瓣个人主页地址：</strong></p> <input type=text class=userurl placeholder=https://www.douban.com/people/81245114/ v-model=userurl debounce=500 _v-00f2f2e0=""> </div> '},480:function(t,e){t.exports=' <style _v-0cc9fb4e=""> /* 覆盖父级元素的样式 */\n  .container {\n    background-color: #000 !important;\n  }\n  footer * {\n    color: #000 !important;\n  } </style> <div class=content _v-0cc9fb4e=""> <div class=face404 _v-0cc9fb4e=""> <div class="eye-socket left" _v-0cc9fb4e=""> <div class=eye _v-0cc9fb4e=""></div> </div> <div class="eye-socket right" _v-0cc9fb4e=""> <div class=eye _v-0cc9fb4e=""></div> </div> </div> <div class=text404 _v-0cc9fb4e=""> <p class=text _v-0cc9fb4e="">Oh!</p> <p class=text _v-0cc9fb4e="">Someting wrong!</p> <a class=redirect href=javascript:void(0) @click=goBack _v-0cc9fb4e="">Go Back?</a> <a class=redirect v-link="\'home\'" _v-0cc9fb4e="">or Go Home?</a> </div> </div> '},481:function(t,e){t.exports=' <chart :options=chartData _v-169fea5e=""></chart> '},482:function(t,e){t.exports=' <header _v-69263686=""> <a v-link="\'/\'" _v-69263686="">Home</a> <a v-link="\'/book\'" _v-69263686="">book</a> </header> '},483:function(t,e){t.exports=' <div class=content _v-f6ccf7f2=""> <spinner id=spinner-box :size=lg text=读取中... v-ref:spinner="" _v-f6ccf7f2=""></spinner> <h2 _v-f6ccf7f2="">{{ user.name }}的{{ readYear }}年豆瓣读书记录</h2> <div class=read-info _v-f6ccf7f2=""> <p _v-f6ccf7f2="">总阅读量：<strong _v-f6ccf7f2="">{{ booksTotal }}</strong>本</p> <p _v-f6ccf7f2="">总阅读时间：<strong _v-f6ccf7f2="">{{ readTime.allReadDay }}</strong>天</p> <p _v-f6ccf7f2="">第一本书：于<strong _v-f6ccf7f2="">{{ readTime.firstReadDay }}</strong>读完《{{ firstRead.book &amp;&amp; firstRead.book.title }}》</p> <p _v-f6ccf7f2="">最近阅读：于<strong _v-f6ccf7f2="">{{ readTime.lastReadDay }}</strong>读完《{{ lastRead.book &amp;&amp; lastRead.book.title }}》</p> <p _v-f6ccf7f2="">平均阅读时间：<strong _v-f6ccf7f2="">{{ readTime.averageDay }}</strong>天/本</p> </div> <h3 _v-f6ccf7f2=""># 图表统计</h3>  <chart :chart-data=chartData.statu _v-f6ccf7f2=""></chart> <chart :chart-data=chartData.rating _v-f6ccf7f2=""></chart> <h3 class=tags-title _v-f6ccf7f2=""># 读书标签</h3> <div class=read-tags _v-f6ccf7f2=""> <span class="tag label label-info" v-for="tag in tags" style="display: inline-block" _v-f6ccf7f2="">{{ tag }}</span> <p class=no-tag v-if=!tags.length _v-f6ccf7f2="">Ta今年还没有打任何标签</p> </div> </div> '},484:function(t,e,o){var a,s;o(468),a=o(168),s=o(477),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},485:function(t,e,o){var a,s;o(473),a=o(169),s=o(481),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},486:function(t,e,o){var a,s;o(469),s=o(478),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},487:function(t,e,o){var a,s;o(474),a=o(170),s=o(482),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},488:function(t,e,o){var a,s;o(475),a=o(171),s=o(483),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},489:function(t,e,o){var a,s;o(471),a=o(172),s=o(479),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},490:function(t,e,o){var a,s;o(472),a=o(173),s=o(480),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},491:function(t,e,o){var a,s;o(470),a=o(167),s=o(476),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)}});
//# sourceMappingURL=app.48489e8b0a9fc1fc1289.js.map