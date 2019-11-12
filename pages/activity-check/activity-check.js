
Page({
  data: {
    eventid:'',
    modalHidden: true,
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderWidth: 0,
    sign:{},
    sign_in:{},
    no_sign:{},
    field:[],
    sign_num:'',
    sign_in_num:'',
    no_sign_num: '',
    information:'',
    page:1
  },
  /**
   * 显示弹窗
   */
  buttonTap: function (e) {
    console.log(e.target.dataset.arr)
    this.setData({
      information: e.target.dataset.arr,
      modalHidden: false
    })
  },
  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      eventid:e.eventid
    })
    console.log(e.eventid)
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/signin-count',
      method: 'POST',
      data: { eventid: e.eventid, page:that.data.page , pageSize:20},
      success: (res) => {
        console.log(res.data.data)
        var arr =[] ;
        arr = arr.concat(res.data.data.field[0]);
        console.log(arr)
        //arr = arr.concat([{ type: '查看详情' }]);
        var sign_num = '报名' + res.data.data.count_signd + '人';
        var sign_in_num = '签到' + res.data.data.yes_Sign_count + '人';
        var no_sign_num = '未签到' + res.data.data.no_count_no + '人';
        that.data.tabs.push(sign_num) ;
        that.data.tabs.push(sign_in_num);
        that.data.tabs.push(no_sign_num);
        that.setData({
          //报名
          sign: res.data.data.sign,
          //签到
          sign_in: res.data.data.sign_in,
          //未签到
          no_sign: res.data.data.no_sign,
          tabs: that.data.tabs,
          field: arr,
          sign_num: res.data.data.count_signd ,
          sign_in_num: res.data.data.yes_Sign_count,
          no_sign_num: res.data.data.no_count_no
        });
        wx.getSystemInfo({
          success: function (res) {
            console.log(res.windowWidth);
            that.setData({
              sliderWidth: res.windowWidth / that.data.tabs.length,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
          }
        });
      }
    })
    
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    that.data.page  += 1;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/signin-count',
      method: 'POST',
      data: { eventid: that.data.eventid, page: that.data.page , pageSize: 20 },
      success: (res) => {
        console.log(res.data.data)
        var sign = that.data.sign.concat(res.data.data.sign);
        var sign_in = that.data.sign_in.concat(res.data.data.sign_in);
        var no_sign = that.data.no_sign.concat(res.data.data.no_sign);
        console.log(sign_in);
        that.setData({
          //报名
          sign: sign,
          //签到
          sign_in: sign_in,
          //未签到
          no_sign: no_sign
        });
        wx.hideLoading();
      }
    })

  }

});


