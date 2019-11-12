// pages/operator-xx/operator-xx.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: "",
    accounts: [{ id: '0', local: '请选择操作地点' }],
    accountIndex: 0,
    hiddenmodalput: true,
    eventid: '',
    avatarUrl:'',
    event_id:'',
    accont: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
 
  if (app.globalData.userInfo) {
      console.log(getApp().globalData.userInfo);
      that.setData({
        userInfo: getApp().globalData.userInfo
      })
      console.log(that.data.userInfo)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                console.log(res.userInfo);
                
                that.setData({
                  userInfo: res.userInfo,
           
                })
             
              }
            })
          } else {
            that.setData({
              hiddenmodalput: false
            })
          }
        }
      })
    }
    this.setData({
      eventid: options.eventid,
      event_id: options.eventid
    })

    console.log(that.data.eventid)

    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/signin/sign-g',
      method: 'post',
      data: {event_id: that.data.eventid},
   
      success: function (res) {
          console.log(res.data);

        that.setData({
          accounts: that.data.accounts.concat(res.data.data)
        })
        console.log(that.data.accounts)
     }
    })



  },
  // 签到员
  bindAccountChange: function (e) {
    console.log(this.data.accounts[e.detail.value]);
    this.setData({
      accountIndex: e.detail.value
    })
  },
 
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo);
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/login/userinfo',
      method: 'POST',
      data: { userinfo: app.globalData.userInfo, wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data)
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hiddenmodalput: true
    })
  },
  formSumbit:function(e){
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    if (e.detail.value.name == "") {
      warn = "请填写姓名！";
    } else if (e.detail.value.phone == '') {
      warn = "请填写手机号！";
    } else if (e.detail.value.location == "0") {
      warn = "请选择操作地点！";
    } else {
      wx.showLoading({
        title: '数据提交中...',
      })
      flag = false;
      var formData = e.detail.value;
      formData.location = this.data.accounts[e.detail.value.location]['loacl'];
      formData.wechat_id = wx.getStorageSync('wechat_id');
      console.log(formData.wechat_id)
       formData.eventid=this.data.eventid;
      console.log(formData.eventid);
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/event/operator',
        method: 'post',
        data: formData,
        success: function (res) {
          wx.hideLoading();
          if(res.data.errcode==1){
            wx.showToast({
              title: '信息添加成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../user/user',
                  })
                }, 1500);      
              
              },
            })
          } else if (res.data.errcode == 0){
            wx.showToast({
              title: '信息已存在',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../user/user',
                  })
                }, 1500);
              }
            })
          }
          console.log(res.data);
        }
      })
    }

 
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        showCancel: false
      })
    }
  }
  
})