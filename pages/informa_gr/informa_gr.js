// pages/informa_gr/informa_gr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      company_id :options.company_id
      //company_id: 16
    })
    console.log(this.data.company_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    } else if(reg.test(e.detail.value.email)==false){
      warn = "邮箱格式错误";
    } else {
      flag = false;
      var formData = e.detail.value;
      formData.company_id = this.data.company_id ;
      formData.user_id = wx.getStorageSync('user_id');
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/mation/information',
        method: 'post',
        data: formData,
        success: function (res) {
          console.log(res.data);

          if (res.data.errcode == 1){
            wx.showModal({
              title: '提示',
              content: '提交成功，您的信息需等后台人员审核通过才能发布活动',
              showCancel: false,
              success: function () {
           
                  wx.switchTab({
                    url: '../zhu/zhu',
                  
                 success: function (e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  })
                wx.removeStorageSync('Company_id'),
                wx.removeStorageSync('name'),
                wx.removeStorageSync('files'),
                wx.removeStorageSync('phone'),
                wx.removeStorageSync('emile'),
                wx.removeStorageSync('region'),
                wx.removeStorageSync('accountIndex'),
                wx.removeStorageSync('Address')
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
  }
})