var dateTimePicker = require('../../utils/dateTimePicker.js');
// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: ['../../img/tupian.png'],
    region: ['请选择地区'],
    industry:[{id:0,value:"请选择活动行业"}],
    industryIndex:0,
    dateTimeArray1: null,
    signenddate:'',
    signendtime: ['选择开始时间'],
    signstartdate:'',
    signstarttime: ['选择开始时间'],

    startdate:'',
    starttime: ['选择开始时间'],
    enddate: '',
    endtime: ['选择结束时间'],
    dateTimeArray1: null,
 
    number: [ "请选择活动规模", "50",'300'],
    numberIndex:0,
    type: [{ id: 0, value: "请选择活动类型" }, { id: 0, value: "开放会议" }, { id:1, value: "闭门会议" }],
    typeIndex: 0,
    startdate:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    // var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    obj1.dateTimeArray.pop();
    obj1.dateTime.pop();
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      startdate: obj1.dateTime,
      enddate: obj1.dateTime,
      signstartdate: obj1.dateTime,
      signenddate: obj1.dateTime
    })
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/mation',
      method: 'post',
      data: '',
      success: function (res) {
        console.log(res.data);
        that.setData({
          industry: that.data.industry.concat(res.data.data)
        })
        console.log(that.data.industry);
      }
    })

  },


  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
        if (tempFilesSize <= 2000000) {   //图片小于或者等于2M时 可以执行获取图片
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: res.tempFilePaths
          });
        } else {    //图片大于2M，弹出一个提示框
          wx.showToast({
            title: '上传图片不能大于2M!',  //标题
            icon: 'none'       //图标 none不使用图标，详情看官方文档
          })
        }
        console.log(that.data.files)

      }
    })
  },
  bindNumberChange:function(e){
    this.setData({
      numberIndex: e.detail.value
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindRegionChange:function(e){
    this.setData({
      region: e.detail.value
    })
  },
  bindIndustryChange:function(e){
    this.setData({
      industryIndex: e.detail.value
    })
  },
  bindStartChange:function(e){
    this.setData({
      startdate: e.detail.value,
      starttime: this.data.dateTimeArray1[0][e.detail.value[0]] + '-' + this.data.dateTimeArray1[1][e.detail.value[1]] + '-' + this.data.dateTimeArray1[2][e.detail.value[2]] + '  ' + this.data.dateTimeArray1[3][e.detail.value[3]] + ':' + this.data.dateTimeArray1[4][e.detail.value[4]]
    })
  },
   bindEndChange: function (e) {
     this.setData({
       enddate: e.detail.value,
       endtime: this.data.dateTimeArray1[0][e.detail.value[0]] + '-' + this.data.dateTimeArray1[1][e.detail.value[1]] + '-' + this.data.dateTimeArray1[2][e.detail.value[2]] + '  ' + this.data.dateTimeArray1[3][e.detail.value[3]] + ':' + this.data.dateTimeArray1[4][e.detail.value[4]]
     })
   
  },
  bindSignstartChange: function (e) {
    this.setData({
      signstartdate: e.detail.value,
      signstarttime: this.data.dateTimeArray1[0][e.detail.value[0]] + '-' + this.data.dateTimeArray1[1][e.detail.value[1]] + '-' + this.data.dateTimeArray1[2][e.detail.value[2]] + '  ' + this.data.dateTimeArray1[3][e.detail.value[3]] + ':' + this.data.dateTimeArray1[4][e.detail.value[4]]
    })
  },
  bindSignendChange: function (e) {
    this.setData({
      signenddate: e.detail.value,
      signendtime: this.data.dateTimeArray1[0][e.detail.value[0]] + '-' + this.data.dateTimeArray1[1][e.detail.value[1]] + '-' + this.data.dateTimeArray1[2][e.detail.value[2]] + '  ' + this.data.dateTimeArray1[3][e.detail.value[3]] + ':' + this.data.dateTimeArray1[4][e.detail.value[4]]
    })
  },
 
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value);
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    if (e.detail.value.province == '' || e.detail.value.city == '' || e.detail.value.district == '') {
      warn = "请选择活动地区";
    } else if (e.detail.value.title == "") {
      warn = "请填写活动名称！";
    } else if (e.detail.value.industry == "0") {
      warn = "请选择活动行业！";
    } else if (e.detail.value.Address == '') {
      warn = "请填写活动详细地址"
    } else if (e.detail.value.activity_start_time == '') {
      warn = "请选择活动开始时间";
    } else if (e.detail.value.activity_end_time == "") {
      warn = "请选择活动结束时间！";
    } else if (e.detail.value.size == "") {
      warn = "请选择活动规模！";
    } else if (e.detail.value.type == "") {
      warn = "请选择活动类型！";
    } else if (e.detail.value.Start_time == '') {
      warn = "请选择报名开始时间！";
    } else if (e.detail.value.End_time == "") {
      warn = "请选择报名结束时间！";
    }else if (e.detail.value.content == "") {
      warn = "请填写活动内容！";
    } else if (that.data.files[0] == '../../img/tupian.png') {
      warn = "请上传图片！";
    }else {
      wx.showLoading({
        title: '数据提交中...',
      })
      console.log(that.data.files)
      flag = false;
      var formData = e.detail.value;
      formData.user_id = wx.getStorageSync('user_id');
      formData.industry = this.data.industry[e.detail.value.industry]['id'];
      formData.type = this.data.type[e.detail.value.type]['id'];
      formData.size = this.data.number[e.detail.value.size]
      console.log(formData);
      wx.uploadFile({
        url: 'https://yq.51data.com.cn/api/v1/event/create',
        filePath: that.data.files[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: formData,
        success: function (res) {
          wx.hideLoading();
          console.log(res.data);
          var data = JSON.parse(res.data);
          if(data.errcode==1){
            wx.redirectTo({
              url: '../select-sign/select-sign?eventid=' + data.data.eventid,
            })
          }else{
            wx.showModal({
              title: '提示',
              content: data.msg,
              showCancel: false
            })
          }
          
        }
      })
    /*  wx.uploadFile({
        url: 'http://yq.51data.com.cn/api/v1/event/create',
        filePath: that.data.files[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: formData,
        success: function (res) {
          console.log(res.data);
          wx.navigateTo({
            url: '../schedule/schedule?eventid=' + res.data.data.eventid,
          })
        }
      })*/
    }
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        showCancel: false
      })
    }
  }
})