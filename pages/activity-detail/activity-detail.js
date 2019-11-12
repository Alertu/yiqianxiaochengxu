Page({
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderWidth: 0,
    Required: {},
    event: "",
    event_schedule: {},
    guest: {},
    eventid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenmodalput: true,
    type: '',
    isfx: false,
    ewmurl: '',
    imgurl: '',
    userInfo: '',
    ishai: false,
    tabs: '',
    status:'',


  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      eventid: e.eventid,
      status: e.status
    });
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/details',
      method: 'POST',
      data: { eventid: e.eventid},
      success: (res) => {
        console.log(res.data.data)
        var cnt = res.data.data.event.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');     
        res.data.data.event.content = cnt;
        for (var index in res.data.data.guest) {
          res.data.data.guest[index].Introduction = res.data.data.guest[index].Introduction.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
        }
        for (var index in res.data.data.event_schedule) {
          res.data.data.event_schedule[index].content = res.data.data.event_schedule[index].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
        }
        var tabs = [{ id: 0, content: "活动内容" }];
        if (res.data.data.event.schedule == 1) {
          tabs.push({ id: 1, content: '活动日程' });
        }
        if (res.data.data.event.Guest == 1) {
          tabs.push({ id: 2, content: '活动嘉宾' });
        }
        wx.setNavigationBarTitle({
          title: res.data.data.event.title
        })
       // WxParse.wxParse('article', 'html', res.data.data.event.content, that, 5);
        that.setData({
          event: res.data.data.event,
          Required: res.data.data.Required,
          event_schedule: res.data.data.event_schedule,
          guest: res.data.data.guest,
          tabs: tabs

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
  tishi:function(){
    wx.showModal({
      title: '提示',
      content: '您的活动已经审核已经通过，如需修改请联系后台工作人员修改',
      showCancel: false
    })
  },
  xiugai:function(){
    wx.redirectTo({
      url: '',
    })
  },
  /**
  * 用户点击右上角分享
  */

  // onShareAppMessage: function () {
  //   return {
  //     title: this.data.event.title,
  //    // desc: '自定义分享描述',
  //     path: '/pages/user/user?eventid=' + this.data.eventid + '&type=0'//0代表报名
  //   }
  // },


  // 分享
  getEwmurl() {
    let that = this;
    let ewmurl = "https://yq.51data.com.cn"
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/sign/poster',
        method: 'POST',
        data: { event_id: that.data.eventid },
        success: (res) => {
          ewmurl = `${ewmurl}${res.data.msg}`
          resolve(ewmurl)
        }
      })
    })
  },
  getImgurl() {
    let that = this;
    let imgurl = "https://yq.51data.com.cn";
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/event/details',
        method: 'POST',
        data: { eventid: that.data.eventid },
        success: (res) => {
          imgurl = `${imgurl}${res.data.data.event.img_url}`
          resolve(imgurl);
        }
      })
    })
  },
  getFenxiang() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '图片将保存于本地相册,用于分享',
      success(res) {
        if (res.confirm) {

          that.setData({
            isfx: true,
            userInfo: getApp().globalData.userInfo
          })
          Promise.all([that.getEwmurl(), that.getImgurl()]).then(e => {
            let [ewmurl, imgurl] = e;
            const ctx = wx.createCanvasContext('canvas1');
            ctx.save();
            ctx.beginPath();
            ctx.arc(40, 300, 35, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            new Promise(function (resolve, reject) {
              wx.downloadFile({
                url: that.data.userInfo.avatarUrl,
                success(res) {
                  // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                  if (res.statusCode === 200) {
                    resolve(res.tempFilePath)
                  }
                }
              })
            }).then(avatarUrl => {
              ctx.drawImage(avatarUrl, 0, 260, 80, 80);
              ctx.restore();
              new Promise(function (resolve, reject) {
                wx.downloadFile({
                  url: imgurl,
                  success(res) {
                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                    if (res.statusCode === 200) {
                      resolve(res.tempFilePath)
                    }
                  }
                })
              }).then(imgurl => {
                ctx.drawImage(imgurl, 0, 8, 375, 240);
                ctx.setFillStyle('#EEEEEE');
                ctx.setFontSize(14);
                ctx.setStrokeStyle("#363636");
                ctx.strokeText("请扫描右侧二维码加入本活动", 90, 305);
                new Promise(function (resolve, reject) {
                  wx.downloadFile({
                    url: ewmurl,
                    success(res) {
                      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                      if (res.statusCode === 200) {
                        resolve(res.tempFilePath)
                      }
                    }
                  })
                }).then(ewmurl => {
                  ctx.drawImage(ewmurl, 290, 260, 80, 80);
                  ctx.draw(false, function () {
                    wx.canvasToTempFilePath({
                      fileType: "jpg",
                      canvasId: 'canvas1',
                      success(res) {
                        that.setData({
                          ishai: true
                        })
                        wx.saveImageToPhotosAlbum({
                          filePath: res.tempFilePath,
                          success(res) {
                            wx.showToast({
                              icon: "success",
                              title: '图片已保存',
                            })
                          }
                        })
                        that.setData({
                          imgurl: res.tempFilePath
                        })
                      }
                    })
                  })
                })
              })
            });
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },



  setFenxiang() {
    this.setData({
      isfx: false
    })
  },

});

