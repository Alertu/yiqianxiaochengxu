Page({
  data: {
    inputShowed: false,
    inputVal: "",
    events: {},
    //  accounts: [{ id: '0', local: '请选择操作地点' }],
    // accountIndex: 0,
    event_id:'',
    eventid:''

  },
  onLoad: function (options) {
    var that = this;

    wx.getStorage({
      key: 'wechat_id',
      success: function (res) {
        wx.request({
          url: 'https://yq.51data.com.cn/api/v1/personal/opert',
          method: 'POST',
          data: { wechat_id: res.data },
          success: (res) => {
            console.log(res.data.data)
            that.setData({
              events: res.data.data
            });
            wx.setStorageSync('events', that.data.events)
            console.log(that.data.events)
           
          }
        })
      },
    })
    wx.getStorage({
      key: 'events',
      success: function (res) {
        console.log(res.data)
        that.setData({
          event_id: res.data[0].event_id
        })
        wx.request({
          url: 'https://yq.51data.com.cn/api/v1/signin/sign-g',
          method: 'post',
          data: { event_id: that.data.event_id },

          success: function (res) {
            console.log(res.data);

            that.setData({
              accounts: res.data.data
            })
            console.log(that.data.accounts)
          }
        })

   
       console.log(that.data.event_id)
      },
    })

   


  },

  /**
      * 弹窗
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

    this.hideModal();


  },






  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  bindAccountChange: function (e) {
    console.log(this.data.accounts[e.detail.value]);
    this.setData({
      accountIndex: e.detail.value
    })
  },
});