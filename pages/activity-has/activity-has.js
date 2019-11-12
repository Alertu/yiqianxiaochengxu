Page({
  data: {
   event: "",
   eventid: '',
   shenhe:'',
   showModal: false,

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
    }else{
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
    var that = this;
    var user_id = wx.getStorageSync('user_id');

    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/sign/compan',
      method: 'post',
      data: { user_id: user_id },
      success: function (res) {
        console.log(res.data);
     if (res.data.errcode == 1) {
          wx.request({
            url: 'https://yq.51data.com.cn/api/v1/event/index',
            method: 'post',
            data: { user_id: user_id },
            success: function (res2) {
              console.log(res2.data);
              console.log(res2.data.errcode)
              that.setData({
                shenhe: res2.data.errcode
              })
              console.log(that.data.shenhe)
            }
          })

        }
      }
    })
  wx.getStorage({
      key: 'user_id',
      success: function (res) {
        wx.request({
          url: 'https://yq.51data.com.cn/api/v1/personal/activities',
          method: 'POST',
          data: { user_id: res.data },
          success: (res) => {
            console.log(res.data.data)
       
            that.setData({
              event: res.data.data
            });
          }
        })
      },
    })
  },
  tishi:function(){
    wx.showModal({
      title: '提示',
      content: '等活动审核通过才能查看',
      showCancel: false
    })
  },
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function (e) {
    console.log(e.target.dataset.id) ;
    return {
      title: e.target.dataset.title,
      // desc: '自定义分享描述',
      path: '/pages/user/user?eventid=' + e.target.dataset.id + '&type=0'//0代表报名
    }
  },
  gsxx: function () {
    var that = this
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
  grxx() {
    var user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    if (user_id == '') {
      wx.navigateTo({
        url: '../login/login',
      })
    } else{
    wx.navigateTo({
      url: '/pages/xs_informa_gr/xs_informa_gr',
    })
    }
  },

  // huodong(){
  //   wx.showModal({
  //     title: '您可登录易签后台管理发布会议',
  //     content: 'http://admin.51data.com.cn/ (账号密码同步)',
  //     confirmText:'点击复制',
  //     confirmColor:'#6a5ff7',
  //     success(res) {

  //         if (res.confirm) {
  //           wx.setClipboardData({
  //             data: 'http://admin.51data.com.cn/ ',
  //             success(res) {
  //               wx.getClipboardData({
  //                 success(res) {
  //                   console.log(res.data)
  //                 }
  //               })
  //             }
  //           })
  //         } else if (res.cancel) {
  //           console.log('用户点击取消')
  //         }
  //    }
  //   })
    
  // },

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
  setFenxiang() {
    this.setData({
      isfx: false
    })
  },
});