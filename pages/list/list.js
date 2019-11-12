
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    event: {},
   page: 1,
    
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
  // showInput: function () {
  //   this.setData({
  //     inputShowed: true
  //   });
  // },

  // hideInput: function () {
  //   this.setData({
  //     inputVal: "",
  //     inputShowed: false
  //   });
  // },
  // hideInput: function () {
  //   var that=this;
  //   wx.navigateTo({
  //     url:'../list_search/list_search?title='+that.data.inputVal,
  //   })
  //   /*wx.request({
  //     url: 'https://yq.51data.com.cn/api/v1/personal/participate',
  //     method: 'POST',
  //     data: { wechat_id: wx.getStorageSync('wechat_id'), page: 1, pageSize: 2 ,title:that.data.inputVal},
  //     success: (res) => {
  //       console.log(res.data.data)
  //       this.setData({
  //         event: res.data.data
  //       });
  //     }
  //   })*/
  // },
  // clearInput: function () {
  //   this.setData({
  //     inputVal: ""
  //   });
  // },
  // inputTyping: function (e) {
  //   this.setData({
  //     inputVal: e.detail.value
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/personal/participate',
      method: 'POST',
      data: { wechat_id: wx.getStorageSync('wechat_id'), page: that.data.page, pageSize: 10 },
      success: (res) => {
        console.log(res.data.data)
   
        // res.data.data.map((item, index) => {
        //   item.Start_time = item.Start_time.substring(5);
       
        // })
        this.setData({
          event: res.data.data
        });
 
      }
    })
  },

 


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that=this;
    that.data.page = 1;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/personal/participate',
      method: 'POST',
      data: { wechat_id: wx.getStorageSync('wechat_id'), page: that.data.page, pageSize: 10  },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          event: res.data.data
        });
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // 页数+1
    that.data.page += 1;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/personal/participate',
      method: 'POST',
      data: { eventid: that.data.eventid, page: that.data.page, pageSize:10},
      success: (res) => {
        console.log(res.data.data)
        var event = that.data.event.concat(res.data.data);
        this.setData({
          event: event 
        });
        setTimeout(function(){
           wx.hideLoading();
        },1000);
      }
    })

  }
})