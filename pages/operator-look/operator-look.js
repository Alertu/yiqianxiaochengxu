// pages/operator-look/operator-look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    operatorid:'',
    operator:'',
    eventid:'',
    accounts: [{ id: '0', local: '请选择操作地点' }],
    accountIndex:0,
    hiddenmodalput: true,
    hidden:true,
    event_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      operatorid: options.operatorid,
      eventid: options.eventid,
      event_id: options.eventid
    })
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/scan-code',
      method: 'POST',
      data: { operator_id: that.data.operatorid, eventid:that.data.eventid },
      success: (res) => {
        console.log(res.data.data.operator)
        that.setData({
          operator: res.data.data.operator,
        });
      }
    })

    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/signin/sign-g',
      method: 'post',
      data: { event_id: that.data.eventid },

      success: function (res) {
        console.log(res.data);

        that.setData({
          accounts: that.data.accounts.concat(res.data.data)
        })
        console.log(that.data.accounts)
      }
    })
  },

  bindAccountChange: function (e) {
    console.log(this.data.accounts[e.detail.value]);
    this.setData({
      accountIndex: e.detail.value
    })
  },
  xiugai:function(){
    this.setData({
      hidden:false
    })
  },
  formsubmit:function(e){
    var that=this;
    if(e.detail.value.location==""){
      wx.showModal({
        title: '提示',
        content: '请填写操作地址',
        showCancel: false
      })
    }else{
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/personal/update-operator',
        method: 'post',
        data: { location: this.data.accounts[e.detail.value.location]['id'], eventid: that.data.eventid, Operatorid: that.data.operatorid },
        success: function (res) {
          console.log(res.data);
          that.setData({
            hidden: true
          })
          if (res.data.errcode == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              success: function () {
               that.onLoad();
      
              },
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel:false
            })
          }

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {

    // var arr = {operatorid:this.data.operatorid,eventid:this.data.eventid}
    // this.onLoad(arr);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})