// pages/select-sign/select-sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: [{ id: '0', value: '未设置' }, { id: '1', value: '是' }, { id: '2', value: '否' }],
    accountIndex: 2,

    type: [{ id: '0', value: '未设置' }, { id: '1', value: '是' }, { id: '2', value: '否' }],
    typeIndex: 1,

    qian: [{ id: '0', value: '未设置' }, { id: '1', value: '是' }, { id: '2', value: '否' }],
    qianIndex: 1,
    checkboxItems: [
      { name: '必填', value: '1'}
    ],
  
    mandatory:[1],
    eventid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     eventid:options.eventid
     //eventid: 81
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },
 
  formSubmit:function(e){
    var that = this;
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    var arr={type:[]};
    console.log(e.detail.value)
    for (var ind in that.data.mandatory) {
      var index2='f'+ind;
      var index3 = 'o' + ind;
      var index4 = 'b' + ind;
      if (e.detail.value[ind] != '') {
        var arr2 = { type: '', fill: '', open: '',baoming:'' };
        arr2.type= e.detail.value[ind];
        arr2.fill = e.detail.value[index2];
        arr2.open = e.detail.value[index3];
        arr2.baoming= e.detail.value[index4];
        arr.type.push(arr2);
        console.log(arr);
      }
    }
    /*for (var index in e.detail.value) {
      if (e.detail.value[index]!=''){
        arr.type[index]= e.detail.value[index];
      }
    }*/
    console.log(arr);
    if(arr.type==''){
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1500,
        success: function (as) {
          setTimeout(function () {
            wx.switchTab({
              url: '../user/user',
            })
          }, 1500)
        }
      });
    }else{
      wx.showLoading({
        title: '数据提交中...',
      })
      var formData = arr;
      formData.event_id=that.data.eventid;
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/event/event-sign',
        method: 'post',
        data: formData,
        success: function (res) {
          wx.hideLoading();
          console.log(res.data);
          if(res.data.errcode==1){
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 1500,
              success: function (as) {
                setTimeout(function(){
                  wx.switchTab({
                    url: '../user/user',
                  })
                },1500)
              }
            });
          }
        }
      })
    }
  
  },
  user:function(){
    wx.navigateTo({
      url: '../user/user',
    })
  },
  addmandatory: function(){
    var arr = this.data.mandatory.concat(3);
    console.log(arr);
    this.setData({
      mandatory: arr,
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindAccountChange(e){
    this.setData({
      accountIndex:e.detail.value
    })
  },
  bindwChange(e){
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindqianChange(e){
    this.setData({
      qianIndex: e.detail.value
    })
  }
})