if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/uni-load-more/uni-load-more?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../colorui/components/cu-custom?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/uni-fab/uni-fab?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/main?hash=99dce412ddde61f9459dc5eb58f53d247ea06ebf');
require('../../components/warn?hash=0aab5f4e3740acd6a32f20e91e4a60329d2e22f3');
require('../../components/affair?hash=99dce412ddde61f9459dc5eb58f53d247ea06ebf');
require('../../components/notice?hash=40c8d79e4c74736202d9c8d28eb40d9779910897');
require('../../components/setting?hash=2edc1b2160908cdf7c2d19bdd1e2403edd4b6792');
require('../../components/uni-icons/uni-icons?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/uni-notice-bar/uni-notice-bar?hash=993ca45dec9dcdb8f19451ba17e5ec831eb613a0');
require('../../components/uni-rate/uni-rate?hash=993ca45dec9dcdb8f19451ba17e5ec831eb613a0');
require('../../components/uni-section/uni-section?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index?hash=75e9b140c40a31b377b0f9e9472ea2b77f764b59');
require('../../pages/login?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/main/shareApp?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/main/addOwner?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/main/manager?hash=96524082a4fbf67d60ead2d5d406d5959473568c');
require('../../pages/main/rooms?hash=050e3a6d5cf64caa4cab43712f6188f658e6d391');
require('../../pages/main/register?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/notice/article?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/main/viewRegister?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/main/records?hash=050e3a6d5cf64caa4cab43712f6188f658e6d391');
require('../../pages/notice/ads?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/setting/updatepwd?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/notice/webview?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/main/addAffair?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/affair/affair?hash=2a49be089c717dbfb4449f4a21924a295bc1fdfd');
require('../../pages/main/addFamily?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/register/index?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}