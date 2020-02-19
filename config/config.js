export const contextPath="jeeplus"
export const baseurl="https://dams.nmghl.com/";
//export const baseurl="http://nmghlnw.xicp.net:8081/";
export const dataurl=baseurl+contextPath;
export const addOwnerApi=dataurl+"/shfwApi/add";//新增人员
export const loginApi=dataurl+"/shfwApi/auth";//使用API需要验证，账号admin密码111111
export const viewApproveApi=dataurl+"/shfwApi/getAffair";//查看发起的投诉或报修
export const floorlistApi=dataurl+"/shfwApi/getFloorlist";//获得楼层信息
export const noticeTopApi=dataurl+"/shfwApi/getNotice";//获得最新一条公告
export const roomownersApi=dataurl+"/shfwApi/getRoomsList";//获得对应楼层房间及人员信息
export const approveApi=dataurl+"/shfwApi/postAffair";//发起投诉或报修
export const recodsApi=dataurl+"/shfwApi/getComeAndGosList";//发起投诉或报修
export const articlesApi=dataurl+"/shfwApi/getNotifylist";  //请求内容{type:''},type为公告类型，未指定获取全部
export const articleApi=dataurl+"/shfwApi/getNotifyInfo";  //请求内容
export const getuserbyidApi=dataurl+"/shfwApi/getPersonInfo";//根据id获取业主信息
export const ADInfoApi=dataurl+"/shfwApi/getAdvertisementInfo";//获取广告信息详情
export const ADListApi=dataurl+"/shfwApi/getAdvertisementlist";//获取广告信息列表

export const viewRecodeApi=dataurl+"/shfwApi/getComeAndGoInfo";//根据登记记录id获取记录详情
export const roomusersApi=dataurl+"/shfwApi/getPersonListByRoomId";//获得人员信息根据房间号
export const appUpdateApi=dataurl+"/shfwApi/appUpdate";//检测更新App
export const warndatasApi=dataurl+"/shfwApi/warndatas";//预警信息
export const registerApi=dataurl+"/shfwApi/addComeAndGo";//进出登记
export const updatepwdApi=dataurl+"/shfwApi/modifyPwd";//更新密码

export const locationApi=dataurl+"/shfwApi/location";//更新密码

export const postAffairApi=dataurl+"/shfwApi/postAffair";//诉求上报
export const affairApi=dataurl+"/shfwApi/getAffairInfo";//诉求上报
export const affairsApi=dataurl+"/shfwApi/getOwnerAffairlist";//诉求上报
export const rateApi=dataurl+"/shfwApi/rate";//诉求上报

export const registersysApi=dataurl+"/shfwApi/registerProperty";////物业 注册登记
export const registerownerApi=dataurl+"/shfwApi/registerOwner";////业主 注册登记
export const arealistApi=dataurl+"/shfwApi/getArealistByCode";////根据区划获取街道列表
//ak=8VtsnDv2WiLhwB5TT9zQ50K02i8M91UR
export const baiduZFBApi="https://api.map.baidu.com/reverse_geocoding/v3/?ak=s4ABqsbSufmsasda1WKIL3a9A840zhAi&output=json&coordtype=gcj02ll&extensions_town=true";////根据区划获取街道列表
export const baiduApi="https://api.map.baidu.com/reverse_geocoding/v3/?ak=8VtsnDv2WiLhwB5TT9zQ50K02i8M91UR&output=json&coordtype=gcj02ll&extensions_town=true";////根据区划获取街道列表

export const aboutArticleId="10000";//关于我们
export const handbookId="10002";//使用手册