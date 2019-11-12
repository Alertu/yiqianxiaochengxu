// pages/guest/guest.js
Page({
  data: {
    files: ['../../img/2232.png'],
    eventid: '',
    status:''
    //leixing: ''
  },
  onLoad:function(options){
    this.setData({
      eventid:options.eventid,
      //leixing: options.type,
      status: options.status
    })
  },
  
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        });
        
      }
    })
  },
  formSubmit:function(e){
    var that = this;
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    if(e.detail.value.name==''){
       warn='请输入嘉宾名称！'
    } else if(e.detail.value.appellation==''){
      warn = '请输入嘉宾称谓！'
    } else if (e.detail.value.Introduction == '') {
      warn = '请输入嘉宾介绍！'
    } else if (that.data.files[0]== '') {
      warn = '请选择嘉宾图片！'
    }else{
      wx.showLoading({
        title: '数据提交中...',
      })
      flag = false;
      var formData = e.detail.value;
      formData.event_id = this.data.eventid;
      console.log(formData);
      console.log(that.data.files[0]);
      wx.uploadFile({
        url: 'https://yq.51data.com.cn/api/v1/event/guest',
        filePath: that.data.files[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: formData,
        success: function (res) {
          wx.hideLoading();
          console.log(JSON.parse(res.data));
          var data = JSON.parse(res.data);
          if (data.errcode == 1) {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 1000,
                success: function () {
                  setTimeout(function(){
                    wx.redirectTo({
                      url: '../activity-detail/activity-detail?eventid=' + data.data.eventidqiandao
                    })
                  },1000)
                },
              })       
          }
        }
      })
    }
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        showCancel: false
      })
    }
  },
});

