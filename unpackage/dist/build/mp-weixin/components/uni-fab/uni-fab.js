(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-fab/uni-fab"],{"26b2":function(t,n,i){"use strict";i.r(n);var o=i("69d6"),e=i("cd30");for(var r in e)"default"!==r&&function(t){i.d(n,t,function(){return e[t]})}(r);i("eca3");var c,s=i("f0c5"),u=Object(s["a"])(e["default"],o["b"],o["c"],!1,null,"611bc1f6",null,!1,o["a"],c);n["default"]=u.exports},"69d6":function(t,n,i){"use strict";var o,e=function(){var t=this,n=t.$createElement;t._self._c},r=[];i.d(n,"b",function(){return e}),i.d(n,"c",function(){return r}),i.d(n,"a",function(){return o})},c725:function(t,n,i){},c811:function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"UniFab",props:{pattern:{type:Object,default:function(){return{}}},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:function(){return[]}},show:{type:Boolean,default:!1}},data:function(){return{fabShow:!1,flug:!0,isShow:!1,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#3c3e49"}}},computed:{contentWidth:function(n){return t.upx2px(110*(this.content.length+1)+20)+"px"},contentWidthMin:function(){return t.upx2px(110)+"px"},boxWidth:function(){return this.getPosition(this.content.length+1,"horizontal")},boxHeight:function(){return this.isShow?this.contentWidth:0},leftBottom:function(){return this.getPosition(0,"left","bottom")},rightBottom:function(){return this.getPosition(0,"right","bottom")},leftTop:function(){return this.getPosition(0,"left","top")},rightTop:function(){return this.getPosition(0,"right","top")},flexDirectionStart:function(){return this.getPosition(1,"vertical","top")},flexDirectionEnd:function(){return this.getPosition(1,"vertical","bottom")},horizontalLeft:function(){return this.getPosition(2,"horizontal","left")},horizontalRight:function(){return this.getPosition(2,"horizontal","right")}},watch:{pattern:function(t,n){console.log(JSON.stringify(t)),this.styles=Object.assign({},this.styles,t)}},created:function(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=Object.assign({},this.styles,this.pattern)},methods:{_onClick:function(){this.isShow=!this.isShow},open:function(){this.isShow=!0},close:function(){this.isShow=!1},_onItemClick:function(t,n){this.$emit("trigger",{index:t,item:n})},getPosition:function(t,n,i){return 0===t?this.horizontal===n&&this.vertical===i:1===t?this.direction===n&&this.vertical===i:2===t?this.direction===n&&this.horizontal===i:this.isShow&&this.direction===n?this.contentWidth:this.contentWidthMin}}};n.default=i}).call(this,i("543d")["default"])},cd30:function(t,n,i){"use strict";i.r(n);var o=i("c811"),e=i.n(o);for(var r in o)"default"!==r&&function(t){i.d(n,t,function(){return o[t]})}(r);n["default"]=e.a},eca3:function(t,n,i){"use strict";var o=i("c725"),e=i.n(o);e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-fab/uni-fab-create-component',
    {
        'components/uni-fab/uni-fab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("26b2"))
        })
    },
    [['components/uni-fab/uni-fab-create-component']]
]);
