(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/viewRegister"],{"1da4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{recode:{}}},onLoad:function(t){e.showLoading({title:"加载中...",mask:!0}),this.requestParams=t;var n=this,a=this.$common.getParams("recode");a.id=this.requestParams.recodeid,this.$api.viewRecode(a,function(e){console.log(JSON.stringify(e)),e.success?n.recode=e.data:n.$common.errorToShow(e.message)})},onReady:function(){e.hideLoading()},methods:{}};t.default=n}).call(this,n("543d")["default"])},"7a49":function(e,t,n){"use strict";n.r(t);var a=n("1da4"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=o.a},"9c0a":function(e,t,n){"use strict";n.r(t);var a=n("ba50"),o=n("7a49");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);var u,c=n("f0c5"),i=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);t["default"]=i.exports},ba50:function(e,t,n){"use strict";var a,o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",function(){return o}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return a})},dee0:function(e,t,n){"use strict";(function(e){n("d394"),n("921b");a(n("66fd"));var t=a(n("9c0a"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["dee0","common/runtime","common/vendor"]]]);