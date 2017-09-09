// pages/groupBuy/groupBuy.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    groupBuyData:[]
 },
  // 弹出弹窗
  order: function (e) {
    var applyindex = e.currentTarget.dataset.applyindex;
    this.setData({
      applyindex:applyindex
    })
    console.log(applyindex)
      var title = this.data.groupBuyData[this.data.applyindex].title;
    this.setData({
      title: title
    })
    this.setData({
      displayForm: 'block'
    })
    this.createCode();
  },
  close:function(){
    this.setData({
      displayForm: 'none'
    })
  },
  // 生成验证码
  createCode: function () {
    var code = '';
    var length = 4;
    var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
    for (var i = 0; i < length; i++) {
      // 设置随机数的范围0~52
      var index = Math.floor(Math.random() * 52);
      code += random[index];
    }
    this.setData({
      code: code
    })
  },
  // 提交表单
  formSubmit: function (e) {
    var that = this;
    var userName = e.detail.value.userName;
    var teleNumber = e.detail.value.teleNumber;
    var textValue = e.detail.value.textValue;
    var clearCode = e.detail.value.code;
    var reg = /^1[34578]\d{9}$/;
    if (userName.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
      })
    } else if (!reg.test(teleNumber)) {
      wx.showToast({
        title: '请输入正确的电话号码',
      })
    } else if (this.data.code != e.detail.value.code) {
      wx.showToast({
        title: '验证码错误',
      })
    } 
    else {
      wx.request({
        url: 'https://www.hjw68.com/wp-json/get/v1/insert_liuyanban',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'POST',
        data: {
          chenghu: userName,
          dianhua: e.detail.value.teleNumber,
          beizhu: e.detail.value.textValue,
          type: '优惠团购',
          guanlian_id: this.data.groupBuyData[this.data.applyindex].ID,
          bmym_mingcheng: '小程序-' + this.data.groupBuyData[this.data.applyindex].title
        },
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: '提交成功',
          });
          setTimeout(function () {
            that.setData({
              displayForm: 'none',
              userName:'',
              teleNumber:'',
              textValue:'',
              clearCode:''
            })
          }, 2200)
        }
      })
    }
  },
  calling:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.last,
    })
  },
  getData:function(){
    var that = this;
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/tuangou',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
      // that.setData({
      //   groupBuyData: res.data
      // })
      var groupBuyDataArr = []
      for (var i in res.data) {
        groupBuyDataArr.push(res.data[i]);
      }
      that.setData({
        last: groupBuyDataArr.pop()
      })
      console.log(that.data.last);
      // console.log(groupBuyDataArr)
      var end_time = groupBuyDataArr.map(item => item.jieshushijian);
      // console.log(end_time)
      var timeArr = []
      end_time.forEach((t, i) => {
        setClock(t, i)
      })
      function setClock(endTime, i) {
        setInterval(() => {
          var t = timeCountdown(endTime, i)
          if (t <= 0) {
            timeArr[i] = "已截止"
          }
          // console.log(timeArr);
          groupBuyDataArr.forEach((value, i, array) => {
            value.time = timeArr[i];
          })
          that.setData({
            groupBuyData: groupBuyDataArr
          })
        }, 1000)
      }
      function timeCountdown(endTime, i) {
        var now = new Date(),
          endTime = endTime,
          t = new Date(endTime).getTime() - now.getTime() / 1000,
          seconds = parseInt(t % 60),
          minutes = parseInt(t / 60 % 60),
          hours = parseInt(t / (60 * 60) % 24),
          days = parseInt(t / (24 * 60 * 60))
        timeArr[i] = `${days}天${hours}小时${minutes}分钟${seconds}秒`;
        // console.log(t);
        return t
      }
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    // const filter = (arr, obj) => Object.keys(obj).filter(key => arr.includes(key)).reduce((object, key) => (object[key] = obj[key], object), {})
    
    // console.log(filter(['name'], { name: 'zhangsan', age: 2 }))
    wx.setNavigationBarTitle({
      title: '优惠团购_宏居网',
    })
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
  
  }
})