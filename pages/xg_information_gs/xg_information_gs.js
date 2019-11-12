// pages/xg_information_gs/xg_information_gs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: ['../../img/zhizhao.png'],
    accounts: [{ id: '0', value: '请选择行业' }],
    accountIndex: 0,
    region: ['请选择地区'],
    company_id:'',
    company:'',
    img_url: ''
    /*customItem: '全部'*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      company_id: options.company_id 
    })
    console.log(options.company_id)
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/comps',
      method: 'post',
      //data: { comp_id: options.company_id},
      data: { user_id: wx.getStorageSync('user_id'), comp_id: options.company_id},
      success: function (res) {
        console.log(res.data);
        if (res.data.data.img_url!=null){
          that.setData({
            files: ['https://yq.51data.com.cn/' + res.data.data.img_url] ,
            img_url: res.data.data.img_url,
          })
        }
        that.setData({
          company: res.data.data,
          region: [res.data.data.province, res.data.data.city, res.data.data.district]
        })
      }
    })
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/mation',
      method: 'post',
      data: '',
      success: function (res) {
        console.log(res.data);
        that.setData({
          accounts: that.data.accounts.concat(res.data.data)
        })
        for(var index in that.data.accounts){
          if (that.data.accounts[index]['value'] == that.data.company.industry){
            that.setData({
              accountIndex:index
            })
          }
        }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindAccountChange: function (e) {
    console.log(this.data.accounts[e.detail.value]);
    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that=this;
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
    if (e.detail.value.name == "") {
      warn = "请填写公司名称！";
    } else if (e.detail.value.industry == "0") {
      warn = "请选择行业！";
    } else if (e.detail.value.Address == '') {
      warn = "请选择公司详细地址"
    } else if (e.detail.value.province=='' ||e.detail.value.city == '' ||e.detail.value.district == '') {
      warn = "请选择地区";
    } else if (e.detail.value.phone == '') {
      warn = "请输入公司电话";
    } else if (e.detail.value.emile == '') {
      warn = "请输入公司邮箱";
    } else if (reg.test(e.detail.value.emile) == false) {
      warn = "邮箱格式错误";
    } else if (this.data.files[0] == '../../img/zhizhao.png') {
      warn = "请上传营业执照";
    } else {
      flag = false;
      var formData = e.detail.value;
      console.log(that.data.files[0] )
      formData.industry = this.data.accounts[e.detail.value.industry]['value'];
      formData.user_id=wx.getStorageSync('user_id');
      console.log(formData)
      if (that.data.files[0] == 'https://yq.51data.com.cn/' + this.data.img_url) {
        wx.request({
          url: 'https://yq.51data.com.cn/api/v1/mation/update-comp',
          method: 'post',
          data: formData,
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: function (res) {
            console.log(res.data.errcode)
            if (res.data.errcode == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1500,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../user/user'
                    })
                  }, 1500);
                },
              })
            }

          }
        })
      }else{
        wx.uploadFile({
          url: 'https://yq.51data.com.cn/api/v1/mation/update-comp',
          filePath: that.data.files[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: formData,
          success: function (res) {
            res.data = JSON.parse(res.data);
            console.log(res.data)
            if (res.data.errcode == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1500,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../user/user'
                    })
                  }, 1500);
                },
              })
            }

          }
        })
      }
     
      /*wx.request({
        url: 'https://yq.51data.com.cn/api/v1/mation/update-comp',
        method: 'post',
        data: formData,
        success: function (res) {
          if(res.data.errcode==1){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../user/user'
                  })
                }, 1500);
              },
            })
          }
         
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