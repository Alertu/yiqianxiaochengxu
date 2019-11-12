// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },


  formSubmit: function (e) {
    
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/auth/login',
      method: 'POST',
      data: { phone: e.detail.value.phone, password: e.detail.value.password },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: (res) => {
        console.log(res.data.data) 
        if (res.data.data.user_id!=false) {
          wx.setStorage({
            key: "user_id",
            data: res.data.data.user_id,
          })
          if (wx.getStorageInfoSync("user_id")){
            wx.showToast({
              title: '登录成功',
              icon: 'success',
             
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../zhu/zhu',
                    success: function (e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  })
                }, 1500);
              },
            })
          }
          
        }else{
          wx.showToast({
            title: '登录失败',
            icon: 'success',
            duration: 2000
          })  
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  zhuce: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  wangji: function () {
    wx.navigateTo({
      url: '../forgot/forgot',
    })
  }
})