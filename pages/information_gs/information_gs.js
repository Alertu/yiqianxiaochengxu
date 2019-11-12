// pages/information_gs/information_gs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    files: ['../../img/zhizhao.png'],
    accounts: [{ id: '0', value: '未设置' }],
    accountIndex: 0,
    region: ['选择地区'],
    regin:[''],
    id:'',
    company_id:'',
    name : '',
    Address:'',
    phone:'',
    emile:'',
    industry:'',
    accont:''
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var that=this;

    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/mation',
      method: 'post',
      data: '',
      success: function (res) {
        console.log(res.data);
       
        that.setData({
          accounts: that.data.accounts.concat(res.data.data)
        })
       
      }
    })
    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log(res.data)
        that.setData({
          name: res.data
        })
        console.log(that.data.name)
      }, 
    })


    
    // 行业
    var that = this;
    wx.getStorage({
      key: 'accountIndex',
      success: function(res) {
        console.log(res.data)
      
        that.setData({
          accountIndex:res.data
        })
        console.log(that.data.accountIndex)
      },
    })
    // 地址
    wx.getStorage({
      key: 'region',
      success: function (res) {
        console.log(res.data)
        that.setData({
          region:res.data
        })
        console.log(that.data.region)
      },
    })
  //  公司名
    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log(res.data)
        that.setData({
          name: res.data
        })
        console.log(that.data.name)
      }, 
    })
//  详细地址
    wx.getStorage({
   
      key: 'Address',
      success: function (res) {
        console.log(res.data)
        that.setData({
          Address: res.data
        })
        console.log(that.data.Address)
      },
    })


// 公司电话
    wx.getStorage({

      key: 'phone',
      success: function (res) {
        console.log(res.data)
        that.setData({
          phone: res.data
        })
        console.log(that.data.phone)
      },
    })

  // 公司邮箱
    wx.getStorage({

      key: 'emile',
      success: function (res) {
        console.log(res.data)
        that.setData({
          emile: res.data
        })
        console.log(that.data.emile)
      },
    })
  // 营业执照
    wx.getStorage({
      key: 'files',
      success: function (res) {
        console.log(res.data)
        that.setData({
          files: res.data
        })
        console.log(that.data.files)
      },
    })
  },
    
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
        var file= that.data.files;
        wx.setStorageSync('files', file)
      }
    })
  },
  // 行业
  bindAccountChange: function (e) {
    this.data.accounts[e.detail.value]
    this.setData({

      accont: e.detail.value,
     })
    console.log(this.data.accont)
    var accont = this.data.accont;
    this.setData({
      accountIndex: this.data.accounts[accont]['value']
    })
   
    console.log(this.data.accountIndex)
    var accountIndex = this.data.accountIndex;
    wx.setStorageSync('accountIndex', accountIndex)
  },
  // 地址
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    var region = this.data.region
    wx.setStorageSync('region', region)
  },
  // 公司名
  input(e) {
   this.setData({
     name: e.detail.value
   })
   var name = this.data.name;
    wx.setStorageSync('name', name)
  },

  // 详细地址
  input2(e){
    this.setData({
      Address: e.detail.value
    })
    var Address = this.data.Address;
    wx.setStorageSync('Address', Address)
  },
  // 公司电话
  input3(e){
    this.setData({
      phone: e.detail.value
    })
    var phone = this.data.phone;
    wx.setStorageSync('phone', phone)
  },
  // 公司邮箱
  input4(e) {
    this.setData({
      emile: e.detail.value
    })
    var emile = this.data.emile;
    wx.setStorageSync('emile', emile)
  },
  formSubmit: function (e) {
      console.log(e)
      var that = this;
      var warn = "";//弹框时提示的内容
      var flag = true;//判断信息输入是否完整
      var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
      console.log(e.detail.value);
      if (e.detail.value.name == "") {
        warn = "请填写公司名称！";
      } else if (e.detail.value.industry == "0") {
        warn = "请选择行业！";
      } else if (e.detail.value.Address == '') {
        warn = "请选择公司详细地址"
      } else if (e.detail.value.province == '' || e.detail.value.city == '' || e.detail.value.district == '') {
        warn = "请选择地区";
      } else if (e.detail.value.phone == '') {
        warn = "请输入公司电话";
      } else if (e.detail.value.emile == '') {
        warn = "请输入公司邮箱";
      } else if (reg.test(e.detail.value.emile) == false) {
        warn = "邮箱格式错误";
      } else if (that.data.files[0] == '../../img/zhizhao.png') {
        warn = "请上传营业执照";
      } else {
        flag = false;
        var formData = e.detail.value;
        formData.industry = this.data.accountIndex;
        console.log(formData.industry)
        wx.showLoading({
          title: '数据提交中...',
        })
        wx.getStorage({
          key: 'Company_id',
          success(res) {
            console.log(res.data)
           that.setData({
             company_id: res.data
           })
            console.log(that.data.company_id)
            if (that.data.company_id){
              wx.redirectTo({
                url: '../informa_gr/informa_gr?company_id=' + that.data.company_id,
              })

            } 
        
            
          }
          
        })

        if (!that.data.company_id) {
          wx.uploadFile({
            url: 'https://yq.51data.com.cn/api/v1/mation/company',
            filePath: that.data.files[0],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: formData,
            success: function (res) {
              wx.hideLoading();
              console.log(res.data);

              var data = JSON.parse(res.data).data.Company_id;
              
              wx.setStorage({
                key: 'Company_id',
                data: data,
              })
              console.log(data)
              if (that.data.company_id != data) {
                wx.redirectTo({
                  url: '../informa_gr/informa_gr?company_id=' + data,
                })

              } 

            }

          })
        }
       
        }
        
      
       

  
  

    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        showCancel:false
      })
    }
  }

})