;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/uni-notice-bar/uni-notice-bar"],{"17a3":function(t,n,e){"use strict";var i={"uni-icons":()=>Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"1a34"))},o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return a}),e.d(n,"a",function(){return i})},"25cc":function(t,n,e){"use strict";e.r(n);var i=e("17a3"),o=e("491a");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);e("b36f");var c,u=e("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"e55e4788",null,!1,i["a"],c);n["default"]=r.exports},"491a":function(t,n,e){"use strict";e.r(n);var i=e("6219"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);n["default"]=o.a},"5a9d":function(t,n,e){},6219:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"1a34"))},o={name:"UniNoticeBar",components:{uniIcons:i},props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#fffbe8"},speed:{type:Number,default:100},color:{type:String,default:"#de8c17"},moreColor:{type:String,default:"#999999"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36)),n="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:t,elIdBox:n,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}},mounted:function(){var t=this;this.$nextTick(function(){t.initSize()})},methods:{initSize:function(){var n=this;if(this.scrollable){var e=[],i=new Promise(function(e,i){t.createSelectorQuery().select("#".concat(n.elId)).boundingClientRect().exec(function(t){n.textWidth=t[0].width,e()})}),o=new Promise(function(e,i){t.createSelectorQuery().select("#".concat(n.elIdBox)).boundingClientRect().exec(function(t){n.boxWidth=t[0].width,e()})});e.push(i),e.push(o),Promise.all(e).then(function(){n.animationDuration="".concat(n.textWidth/n.speed,"s"),n.animationDelay="-".concat(n.boxWidth/n.speed,"s"),setTimeout(function(){n.animationPlayState="running"},1e3)})}},loopAnimation:function(){},clickMore:function(){this.$emit("getmore")},close:function(){this.show=!1,this.$emit("close")},onClick:function(){this.$emit("click")}}};n.default=o}).call(this,e("c11b")["default"])},b36f:function(t,n,e){"use strict";var i=e("5a9d"),o=e.n(i);o.a}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/uni-notice-bar/uni-notice-bar-create-component',
    {
        'components/uni-notice-bar/uni-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("25cc"))
        })
    },
    [['components/uni-notice-bar/uni-notice-bar-create-component']]
]);
