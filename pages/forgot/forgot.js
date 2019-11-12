// pages/forgot/forgot.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yanzheng: '获取验证码',
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    phone: "",
    password: "",
    code: '',
    repassword: "",
    display: "display:none",
    wen: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit(e) {
    // e.detail.value对象中可以获取表单输入额值
    //像后台请求接口
    var that = this;
    console.log(e);
    if (e.detail.target.dataset.id == 2) {
      if (!e.detail.value.phone) {
        wx.showModal({
          title: '提示',
          content: '请填写手机号',
          showCancel: false
        })
      } else {
        wx.request({
          url: 'https://yq.51data.com.cn/api/v1/auth/code',
          method: 'POST',
          data: { phone: e.detail.value.phone },
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: (res) => {
            console.log(res.data)
          }
        })
      }
    }
    if (e.detail.target.dataset.id != 2) {
      if (e.detail.value.password.length < 6) {
        wx.showModal({
          title: '提示',
          content: '密码不能小于6位',
          showCancel: false
        })
      } else if (e.detail.value.repassword != e.detail.value.password) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'success',
          duration: 2000
        })
      } else if (!e.detail.value.code) {
        wx.showToast({
          title: '添加验证码',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.getStorage({
          key: 'wechat_id',
          success: function (res) {
            wx.request({
              url: 'https://yq.51data.com.cn/api/v1/auth/reset',
              method: 'POST',
              data: { phone: e.detail.value.phone, password: e.detail.value.password, code: e.detail.value.code, repassword: e.detail.value.repassword, wechat_id: res.data },
              header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
              success: (res) => {
                console.log(res.data.data)
                if (res.data.data) {
                  wx.showToast({
                    title: '密码修改成功',
                    icon: 'success',
                    duration: 1500,
                    success:function(){
                      setTimeout(function(){
                        wx.navigateBack({     //返回上一页面或多级页面
                          delta: 1
                        })
                      },1500)
                    }
                  })
                }else if(res.data.errcode==0){
                  wx.showToast({
                    title: '密码修改成功',
                    icon: 'success',
                    duration: 1500,
                  })
                }
              }
            })
          }
        })
      }
    }
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  loginup: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})