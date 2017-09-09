// pages/newHouseDetail/newHouseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ['../../images/detailPic.jpg', '../../images/detailPic.jpg'],
    // hidden:false,
    displayForm: 'none',
    detailData:{},
    huxingLength:1,
    show: false,
    displayTag: 'block',
    num:1,
    displayPoint: 'block',
    displayImg: 'none'
  },
  // moreInfo:function(){
  //   this.setData({
  //     hidden: true
  //   })
  // },
  // packUpInfo:function(){
  //   this.setData({
  //     hidden: false
  //   })
  // },
  show: function(){
    this.setData({
      show: true
    })
  },
  hidden: function(){
    this.setData({
      show: false
    })
  },
  // 弹出弹窗
  order:function(){
    var displayForm = this.data.displayForm == 'none' ? 'block' : 'none';
    this.setData({
      displayForm: displayForm
    })
    this.createCode();
  },
  // 生成验证码
  createCode: function(){
    var code = '';
    var length = 4;
    var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
    for(var i = 0; i < length; i++){
      // 设置随机数的范围0~52
      var index = Math.floor(Math.random() * 52);
      code += random[index];
    }
    this.setData({
      item: code
    })
  },
  // 提交表单
  formSubmit: function(e){
    var that = this;
    var userName = e.detail.value.userName;
    var teleNumber = e.detail.value.teleNumber;
    var reg = /^1[34578]\d{9}$/;
    if (userName.length == 0){
      wx.showToast({
        title: '姓名不能为空',
      })
    } else if (!reg.test(teleNumber)){
      wx.showToast({
        title: '请输入正确的电话号码',
      })
    } else if (this.data.item != e.detail.value.code){
      wx.showToast({
        title: '验证码错误',
      })
    }else{
      wx.request({
        url: 'https://www.hjw68.com/wp-json/get/v1/insert_liuyanban',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'POST',
        data:{
          chenghu: userName,
          dianhua: e.detail.value.teleNumber,
          beizhu: e.detail.value.textValue,
          type: '经纪人',
          guanlian_id: this.data.detailData.jingjiren.ID,
          bmym_mingcheng: '小程序-' + this.data.detailData.title
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '提交成功',
          });
          setTimeout(function(){
            that.setData({
              displayForm: 'none'
            })
          }, 2200)
        }
      })
    }
  },
  // 联系经纪人，拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.detailData.jingjiren.lianxidianhua,
    })
  },
  // 图片预览
  previewImg: function(e){
    var current = e.currentTarget.dataset.src;
    var arr = this.data.detailData.loupanxiangce.map(item => item.url);
    // console.log(current)
    wx.previewImage({
      current: current,
      urls: arr,
    })
  },
  lookTypeImg: function (e) {
    var current = e.currentTarget.dataset.src;
    var huxingArr = this.data.detailData.huxing.map(item => item.huxingtu);
    var arr = huxingArr.map(item => item.url);
    wx.previewImage({
      current: current,
      urls: arr,
    })
  },
  swiperChange:function(e){
    var currentIndex = e.detail.current;
    var num = currentIndex + 1;
    this.setData({
      num: num,
      currentIndex: currentIndex
    })
  },
  toNewHouseDetail: function(e){
    var id = e.currentTarget.id;
    console.log(id);
    wx.navigateTo({
      url: '../newHouseDetail/newHouseDetail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    // console.log(id);
    var data = {
      id: id
    }
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/xinfangloupan/'+id,
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      success: function(res){
        console.log(res.data);
        that.setData({
          detailData: res.data,
        })
        wx.setNavigationBarTitle({
          title: that.data.detailData.title+'_宏居网',
        })
        console.log(that.data.detailData.title)
        var huxingLength = that.data.detailData.huxing.length;
        if (huxingLength){
          that.setData({
            huxingLength: huxingLength
          })
        }
        
        var biaoqianLength = that.data.detailData.biaoqian.length;
        // console.log(that.data.detailData.biaoqian.length)
        if (biaoqianLength != 0){
          that.setData({
            displayTag: 'block'
          })
        }else{
          that.setData({
            displayTag: 'none'
          })
        }
        var imgLength = that.data.detailData.loupanxiangce.length;
        if(imgLength){
          that.setData({
            imgLength: imgLength
          })
        }else{
          that.setData({
            displayPoint: 'none'
          })
        }
        if (that.data.detailData.loupanxiangce == false){
          that.setData({
            displayImg: 'block'
          })
        }else{
          that.setData({
            displayImg: 'none'
          })
        }
      }
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