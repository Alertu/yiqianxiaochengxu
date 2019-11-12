// pages/xs_informa_gr/xs_informa_gr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personal:'',
    hidden:true
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {

      var that=this;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/personal',
      method: 'post',
      data: { user_id: wx.getStorageSync('user_id') },
      success: function (res) {
        console.log(res.data);
        if (res.data.data == null){
          that.setData({
           hidden:false
          })
        }
        that.setData({
          personal: res.data.data,
        })
      
      }
    })
  }, 
  formSubmit: function (e) {
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    if (e.detail.value.name == "") {
      warn = "请填写姓名！";
    } else if (e.detail.value.departmen == "") {
      warn = "请填写所属部门！";
    } else if (e.detail.value.position == '') {
      warn = "请输入您的职位"
    } else if (e.detail.value.email == '') {
      warn = "请输入您的邮箱";
    } else if (reg.test(e.detail.value.email) == false) {
      warn = "邮箱格式错误";
    }else {
      flag = false;
      var formData = e.detail.value;
      formData.user_id = wx.getStorageSync('user_id');
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/mation/update-personal',
        method: 'post',
        data: formData,
        success: function (res) {
          console.log(res.data);
          if (res.data.errcode == 1) {
            wx.showModal({
              title: '提示',
              content: '提交成功',
              showCancel: false,
              success: function () {
                wx.switchTab({
                  url: '../user/user',
                })
                
              },
            })
          }
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
  },
  xiugai:function(){
   this.setData({
     hidden: false
   })
  }
})