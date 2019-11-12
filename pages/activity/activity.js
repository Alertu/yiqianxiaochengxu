Page({
  data: {
    inputShowed: false,
    inputVal: "",
    event:{}
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
  onLoad: function () {
    var that=this;
    wx.getStorage({
      key: 'wechat_id',
      success: function(res) {
            wx.request({
              url: 'https://yq.51data.com.cn/api/v1/personal/registered',
              method: 'POST',
              data: { wechat_id: res.data, user_id: wx.getStorageSync('user_id') },
              success: (res) => {
                console.log(res.data.data)
                var arr=res.data.data;
                var time = Date.now();
                for(var index in arr){
                  var starttime = Date.parse(arr[index].activity_start_time.replace(/-/g, '/')) 
                  var endtime = Date.parse(arr[index].activity_end_time.replace(/-/g, '/')) 
                  console.log(starttime - time , endtime - time > 0)
                  if (starttime - time <= 172800000 && endtime - time >0){
                    arr[index]['time']=1;//活动即将开始
                  }
                  if (starttime <= time && endtime > time ) {
                    arr[index]['time'] = 2;//活动已开始
                  }
                  if (endtime < time) {
                    arr[index]['time'] = 3;//活动已结束
                    console.log(arr[index]['time'])
                  }
                }
                console.log(arr);
                that.setData({
                  event: arr.reverse()
                });
              }
            })
      },
    })
   
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/personal/registered',
      method: 'POST',
      data: { wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data.data)
        var arr = res.data.data;
        var time = Date.now();
        for (var index in arr) {
          var starttime = Date.parse(arr[index].activity_start_time.replace(/-/g, '/'))
          var endtime = Date.parse(arr[index].activity_end_time.replace(/-/g, '/'))
          console.log(starttime - time, endtime - time > 0)
          if (starttime - time <= 172800000 && endtime - time > 0) {
            arr[index]['time'] = 1;//活动即将开始
          }
          if (starttime <= time && endtime > time) {
            arr[index]['time'] = 2;//活动已开始
          }
          if (endtime < time) {
            arr[index]['time'] = 3;//活动已结束
            console.log(arr[index]['time'])
          }
        }
        this.setData({
          event: arr.reverse()
        });
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
});