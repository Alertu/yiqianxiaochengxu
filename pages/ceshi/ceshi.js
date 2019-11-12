// pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },
  /**
       * 弹窗
       * naicha)(beiylm)(40)
       * weiyi(80)
       * waitao(80)
       * kuzi(60)
       * weishengzhi(30)(300)
       * 
       */
  showDialogBtn: function () {
    if (this.data.shenhe == 3) {
      wx.showToast({
        title: '您的信息需等后台人员审核通过才能发布活动',
        icon: 'none'
      })
    } else {
      this.setData({
        showModal: true
      })
    }

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  /**
     * 对话框取消按钮点击事件
     */
  onCancel: function () {

    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {

    wx.setClipboardData({
      data: 'http://admin.51data.com.cn/ ',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data)
          }
        })
      }
    })
    this.hideModal();


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})