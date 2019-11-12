var dateTimePicker = require('../../utils/dateTimePicker.js');
// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate:'',
    enddate: '',
    starttime: ['选择日程开始时间'],
    endtime: ['选择日程结束时间'],
    dateTimeArray1:null,
    event:[1,2],
    eventid:'',
    type:'submit',
    status:''
  },
  onLoad: function (options){
    // 获取完整的年月日 时分秒，以及默认显示的数组
   // var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
     obj1.dateTimeArray.pop();
     obj1.dateTime.pop();
     this.setData({
       eventid:options.eventid,
       status: options.status,
       dateTimeArray1: obj1.dateTimeArray,
       startdate:obj1.dateTime,
       enddate: obj1.dateTime
     })
     
  },
  bindStartChange: function (e) {
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
  changeDateTimeColumn1(e) {
    var arr = this.data.startdate, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    console.log(arr)
    this.setData({
      dateTimeArray1: dateArr,
      startdate: arr
    });
  },
  changeDateTimeColumn2(e) {
    var arr = this.data.startdate, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    console.log(arr)
    this.setData({
      dateTimeArray1: dateArr,
      enddate: arr
    });
  },
  formSubmit:function(e){
    console.log(e.detail.value);
    var that=this;
    var formData = e.detail.value;
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    if (e.detail.value.Start_time == "选择日程开始时间") {
      warn = "请选择日程开始时间！";
    } else if (e.detail.value.End_time == "选择日程开始时间") {
      warn = "请选择日程开始时间！";
    } else if (e.detail.value.content == '') {
      warn = "请输入活动日程！"
    } else{
      wx.showLoading({
        title: '数据提交中...',
      })
      flag = false;
      formData.eventid = this.data.eventid;
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/event/schedule',
        method: 'post',
        data: formData,
        success: function (res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.errcode == 1) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                setTimeout(function(){
                  wx.redirectTo({
                    url: '../activity-detail/activity-detail?eventid=' + res.data.data.eventid + '&status=' + that.data.status,
                  })
                },1000)
              },
            })
          }else{
            wx.showToast({
              title: '添加失败',
              icon: 'success',
              duration: 2000
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
    
  }
})