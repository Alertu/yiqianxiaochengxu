//app.js
App({
  globalData: {
    userInfo: null,
    
  },
  onLaunch: function () {
    this.globalData = {};
    var that = this;
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
   /* wx.getSetting({
      success: res => {
      
        if (res.authSetting['scope.userInfo']) {
          console.log('get')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(0);
              console.log(res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo;
              wx.request({
                url: 'http://yq.51data.com.cn/api/v1/login/userinfo',
                method: 'POST',
                data: { userinfo: getApp().globalData.userInfo, wechat_id: wx.getStorageSync('wechat_id') },
                success: (res) => {
                  console.log(res.data)
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }else{
          console.log('er'); 
          that.globalData.hinden=true;
        }
      }
    })*/
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://yq.51data.com.cn/api/v1/login/login',
          method: "post",
          data: {
            "code": res.code
          },
          success: function (res) {
            console.log(res.data.data.wechat_id)
            console.log(res)
            if (res.data.data.wechat_id) {
              console.log(res.data.data.wechat_id)
              wx.setStorage({
                key: "wechat_id",
                data: res.data.data.wechat_id,
              })
            }
          }
        })
      }
    })
    const updateManager = wx.getUpdateManager()

    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  }
})
/*
"pages/user/user",
"pages/activity-can/activity-can",
"pages/activity/activity", //已参加的活动
"pages/operator-apply/operator-apply", //嘉宾信息
"pages/operator-look/operator-look", //操作员
"pages/operator-xx/operator-xx", //操作员信息(录入)
"pages/activity-check/activity-check", //活动签到人数
"pages/activity-sign/activity-sign", //活动报名人数
"pages/activity-operator/activity-operator", //活动操作人员
"pages/activity-has/activity-has", //我的活动
"pages/activity-detail/activity-detail", //发布者看的活动详情
"pages/select-sign/select-sign", //选择用户报名需填写的信息
"pages/guest/guest", //嘉宾介绍(录入)
"pages/release/release", //发布活动
"pages/schedule/schedule", //活动日程(录入)
"pages/index/index",
"pages/logs/logs",
"pages/login/login",
"pages/forgot/forgot", //忘记密码
"pages/informa_gr/informa_gr", //个人信息（录入）
"pages/register/register", //注册
"pages/information_gs/information_gs", //公司信息（录入）
"pages/list/list", //列表页
"pages/dynamic/dynamic" //动态
 "pages/baoming/baoming"//用户报名信息填写页
 "pages/activity-detail/activity-detail",//用户报名时看的详情页

 {
        "pagePath": "pages/dynamic/dynamic",
        "iconPath": "img/dongtai1.png",
        "selectedIconPath": "img/dongtai2.png",
        "text": "动态"
      },
*/