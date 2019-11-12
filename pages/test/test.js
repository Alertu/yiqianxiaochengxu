// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    yan:'',
    text:[
      {
        ta:'ta'
      },
       {
        ta: 'ta'
      }
    ],
     imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.talist();
  },
  zhifu(){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        
       },
      fail(res) { 

      }
    })
  },




  sjh:function(e){
   console.log(e)
    this.setData({
      phone:e.detail.value
    })
    console.log(this.data.phone)
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
  //请求接口
  talist(){
    wx.showLoading({
      title: '加载中。。。',
      mask:true
    })
    wx.request({
      url: '',//地址
      method:'',//类型
      data:'',//参数
      success:(res) =>{
       
      },//成功返回
      success:function(res){

      }//成功返回(json(JSON.parse))
    })
  },


ddd(){
wx.navigateTo({
  url: 'http//?id=',
})
}
})