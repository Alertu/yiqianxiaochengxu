// pages/yong/yong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huo: [
      {
        tu: '/imgs/nei.png',
        nei: "祝成功一会,祝成功一会祝。成功一会祝，成功一会祝成功一会祝成功一会。",
        shi: "1-5 14:000",
        re: "12123人",
        ji: "已结束"
      }

    ]
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

  },
  gsxx: function () {

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
  grxx() {
    wx.navigateTo({
      url: '/pages/xs_informa_gr/xs_informa_gr',
    })
  }

})