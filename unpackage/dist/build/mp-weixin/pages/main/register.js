(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/register"],{1450:function(t,e,n){"use strict";n.r(e);var a=n("4753"),r=n("b121");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("fab7");var s,o=n("f0c5"),u=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=u.exports},3242:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{owner:{},register:{},requestParams:{},time:"12:01",date:"2018-12-25",temperaturefocus:!1,carnofocus:!1,triptype:"步行"}},onLoad:function(e){this.time=this.$common.dateFormat("HH:MM",new Date),this.date=this.$common.dateFormat("YYYY-mm-dd",new Date),t.showLoading({title:"加载中...",mask:!0}),this.requestParams=e;var n=this,a=this.$common.getParams("getuserbyid");a.id=this.requestParams.ownerid,this.$api.getuserbyid(a,function(e){console.log(JSON.stringify(a)+"===="+JSON.stringify(e)),e.success?n.owner=e.data:n.$common.errorToShow(e.message,function(){t.navigateBack({})})})},onReady:function(){t.hideLoading()},methods:{TimeChange:function(t){this.time=t.detail.value},outtypeChange:function(t){this.triptype=t.detail.value},saveRegister:function(e){var n=this,a=this.$common.getParams("saveRegister");a.pid=this.requestParams.ownerid,a.temperature=this.register.temperature,a.state=e,a.triptype=this.triptype,a.car=this.register.car,a.remarks=this.register.remarks,this.$api.register(a,function(e){console.log(JSON.stringify(a)+"===="+JSON.stringify(e)),e.success?n.$common.successToShow("登记成功",function(){t.$emit(n.requestParams.onevent,{updatetype:"updaterecode",params:e.data}),t.navigateBack({})}):n.$common.errorToShow(e.message)})}}};e.default=n}).call(this,n("543d")["default"])},"45ca":function(t,e,n){"use strict";(function(t){n("d394"),n("921b");a(n("66fd"));var e=a(n("1450"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},4753:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})},b121:function(t,e,n){"use strict";n.r(e);var a=n("3242"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=r.a},c902:function(t,e,n){},fab7:function(t,e,n){"use strict";var a=n("c902"),r=n.n(a);r.a}},[["45ca","common/runtime","common/vendor"]]]);