// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: "",
    hiddenmodalput: true
  },


  onShow: function (e) {
    this.onLoad();
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        console.log(res.data);
        that.setData({
          user: res.data
        })
        console.log(that.data.user);
      },
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
    for (var index in options) {
      if (index == 'scene') {
        if (typeof (options.scene) != "undefined") {
          var scene = decodeURIComponent(options.scene);
          console.log('as', scene);
          wx.navigateTo({
            url: '/pages/activity-detail2/activity-detail?eventid=' + scene + '&type=fenxiang',
          })
        }
      }
      if (index == 'type') {
        if (options.type == 0) {
          wx.navigateTo({
            url: '/pages/activity-detail2/activity-detail?eventid=' + options.eventid + '&type=fenxiang',
          })
        } else if (options.type == 1) {
          wx.navigateTo({
            url: '/pages/operator-xx/operator-xx?eventid=' + options.eventid,
          })
        }
      }
    }
    

    var userInfoTmp = app.globalData.userInfo;
    if (userInfoTmp == null) {
      wx.redirectTo({
        url: '../user/user',
      })
    } else {
      this.setData({
        userInfo: userInfoTmp
      })
    }






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
  bindActivitycan: function () {
    wx.navigateTo({
      url: '../activity-can/activity-can',
    })
  },
  bindActivity: function () {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  bindrelease: function () {

    var user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/sign/compan',
      method: 'post',
      data: { user_id: user_id },
      success: function (res) {
        console.log(res.data);
        if (res.data.errcode == 0) {
          wx.showModal({
            title: '提示',
            content: '公司信息还没有添加，请先添加公司信息',
            showCancel: false
          })
        }
        if (res.data.errcode == 1) {
          wx.request({
            url: 'https://yq.51data.com.cn/api/v1/event/index',
            method: 'post',
            data: { user_id: user_id },
            success: function (res2) {
              console.log(res2.data);
              if (res2.data.errcode == 1) {
                wx.navigateTo({
                  url: '../release/release',
                  //url: '../schedule/schedule?eventid=11',
                })
              } else if (res2.data.errcode == 0) {
                wx.showModal({
                  title: '提示',
                  content: res2.data.msg,
                  showCancel: false
                });
              } else if (res2.data.errcode == 3) {
                wx.showModal({
                  title: '提示',
                  content: res2.data.msg,
                  showCancel: false
                });
              } else if (res2.data.errcode == 2) {
                wx.showModal({
                  title: '提示',
                  content: '公司信息审核失败，请修改公司信息',
                  showCancel: false
                });
              }
            }
          })

        }
      }
    })

  },
  bindInforma_gr: function () {

    var user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/sign/compan',
      method: 'post',
      data: { user_id: user_id },
      success: function (res) {
        console.log(res.data);
        if (res.data.errcode == 0) {
          wx.navigateTo({
            url: '../information_gs/information_gs',
          })
        }
        if (res.data.errcode == 1) {
          wx.request({
            url: 'https://yq.51data.com.cn/api/v1/event/index',
            method: 'post',
            data: { user_id: user_id },
            success: function (res2) {
              console.log(res2.data);
              /* if (res.data.errcode == 1) {
                 wx.navigateTo({
                   url: '../release/release',
                   //url: '../schedule/schedule?eventid=11',
                 })
               }else if (res.data.errcode == 0) {
                 wx.showModal({
                   title: '提示',
                   content: res.data.msg,
                   showCancel: false
                 });
               } else */
              if (res2.data.errcode == 2) {
                console.log(res.data.data.Compan_id)
                wx.navigateTo({
                  url: '../xg_information_gs/xg_information_gs?company_id=' + res.data.data.Compan_id,
                })
              } else if (res2.data.errcode == 3) {
                wx.navigateTo({
                  url: '../xs_information_gs/xs_information_gs?company_id=' + res.data.data.Compan_id + '&&status=1',
                })
              } else {
                wx.navigateTo({
                  url: '../xs_information_gs/xs_information_gs?company_id=' + res.data.data.Compan_id,
                })

              }
            }
          })

        }
      }
    })

  },
  bindActivity_can: function () {
    wx.navigateTo({
      url: '../activity-can/activity-can',
    })

  },
  bindActivity_hascv: function () {

      wx.navigateTo({
        url: '../activity/activity',
      })

  },
  bindActivity_operator: function () {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  bingPersonal: function () {
    wx.navigateTo({
      url: '../xs_informa_gr/xs_informa_gr',
    })
  },
  bindActivity_jsh(){
    wx.navigateTo({
      url: '../jshdong/jshdong',
    })
  },
 

})