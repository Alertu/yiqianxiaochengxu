const app = getApp();
Page({
  data: {
    tabs: '',
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
    ishai: false
  },
  onLoad: function (e) {

    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    if (e.type == 'fenxiang') {
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/mation/share-it ',
        method: 'POST',
        data: { eventid: e.eventid, wechat_id: wx.getStorageSync('wechat_id') },
        success: (res) => {
          console.log(res.data.data)
        }
      })
    }
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/details',
      method: 'POST',
      data: { eventid: e.eventid },
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
        var time = Date.now();
        console.log(time);
        console.log(Date.parse(that.data.event.Start_time.replace(/-/g, '/')));
        if (Date.parse(that.data.event.Start_time.replace(/-/g, '/')) > time) {
          this.setData({
            type: 4
          })//未开始报名
        } else if (Date.parse(that.data.event.Start_time.replace(/-/g, '/')) < time && Date.parse(that.data.event.End_time.replace(/-/g, '/')) > time) {
          if (e.type == 'fenxiang' || e.type == 'detail') {
            that.setData({
              type: 1
            })
          } else if (e.type == 'yi') {
            that.setData({
              type: 2
            })
          }
        } else if (Date.parse(that.data.event.End_time.replace(/-/g, '/')) < time && Date.parse(that.data.event.activity_end_time.replace(/-/g, '/')) > time) {
          if (e.type == 'yi') {
            that.setData({
              type: 2
            })
          } else {
            that.setData({
              type: 3
            })
          }//报名已结束
        } else if (Date.parse(that.data.event.activity_end_time.replace(/-/g, '/')) < time) {
          that.setData({
            type: 5
          })
          //活动已结束
        }
        if (e.type == 'operator') {
          that.setData({
            type: 6
          })
          //签到员查看详情
        }
        console.log(that.data.type);
      }
    })

     if (app.globalData.userInfo) {
       console.log(getApp().globalData.userInfo);
       that.setData({
         userInfo: getApp().globalData.userInfo,
         hiddenmodalput: true
       })
     } else {
       // 在没有 open-type=getUserInfo 版本的兼容处理
       wx.getSetting({
         success: function (res) {
           if (res.authSetting['scope.userInfo']) {
             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
             wx.getUserInfo({
               success: res => {
                 app.globalData.userInfo = res.userInfo
                 console.log(res.userInfo);
                 that.setData({
                   userInfo: res.userInfo,
                   hiddenmodalput: true,
                 })
               }
             })
           } else {
             that.setData({
               hiddenmodalput: false
             })
           }
         }
       })
     }
    that.setData({
      eventid: e.eventid
    });
  },

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
                ctx.drawImage(imgurl, 0, 0, 375, 250);
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
                      fileType: "png",
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo);
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/login/userinfo',
      method: 'POST',
      data: { userinfo: app.globalData.userInfo, wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data)
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hiddenmodalput: true
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  baoming: function () {
    console.log(this.data.eventid)
    wx.navigateTo({
      url: '../baoming/baoming?eventid=' + this.data.eventid,
    })
  },
  qrcode: function () {
    console.log(this.data.eventid)
    wx.navigateTo({
      url: '../qrcode/qrcode?event_id=' + this.data.eventid,
    })
  }

});