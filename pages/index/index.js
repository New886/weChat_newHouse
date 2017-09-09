//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   homeData: [],
   menu:{
     'junjia': ['3-4万', '4-5万', '5-6万'],
     'fangxing': ['二室', '三室', '四室', '别墅', ],
     'zhuangtai': ['在售']
   }
  },
  // 跳转到列表页
  toNewHouseList:function(){
    wx.navigateTo({
      url: '../newHouseList/newHouseList',
    })
    this.setData({
      priceindex:null,
      typeindex:null,
      stateindex:null
    })
  },
  toGroupBuyList:function(){
    wx.navigateTo({
      url: '../groupBuy/groupBuy',
    })
  },
  toLookHouseList: function(){
    wx.navigateTo({
      url: '../lookHouse/lookHouse',
    })
  },
  // 获取价格筛选项的下标和文本内容
  getpriceIndex: function(e){
    var priceindex = e.currentTarget.dataset.priceindex;
    this.setData({
      priceindex: priceindex,
      item: this.data.menu.junjia[priceindex]
    })
    this.getHomeData();
    var items = this.data.item
    // console.log(items);
    wx.navigateTo({
      url: '../newHouseList/newHouseList?price='+items,
    })
  },
  getTypeIndex: function(e){
    var typeindex = e.currentTarget.dataset.typeindex;
    this.setData({
      typeindex: typeindex,
      item: this.data.menu.fangxing[typeindex]
    })
    this.getHomeData();
    var items = this.data.item
    // console.log(items);
    wx.navigateTo({
      url: '../newHouseList/newHouseList?houseType='+items,
    })
  },
  getStateIndex: function(e){
    var stateindex = e.currentTarget.dataset.stateindex;
    this.setData({
      stateindex: stateindex,
      item: this.data.menu.zhuangtai[stateindex]
    })
    this.getHomeData();
    var items = this.data.item
    // console.log(items);
    wx.navigateTo({
      url: '../newHouseList/newHouseList?state='+items,
    })
  },
  // 数据请求
  getHomeData: function(){
    var that = this;
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/index',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      data: {
        junjia: that.data.menu.junjia[that.data.priceindex],
        fangxing: that.data.menu.fangxing[that.data.typeindex],
        zhuangtai: that.data.menu.zhuangtai[that.data.stateindex]
      },
      success: function (res) {
        console.log(res);
      that.setData({
        homeData: res.data
      })
      }
    })
  },
  // 获取图片数据
  getImgData:function(){
    var that = this;
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/lunbotu',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      success: function(res){
        console.log(res.data)
        that.setData({
          imgData:res.data
        })
      }
    })
  },
  toNewDetail: function(e){
    var id = e.currentTarget.id;
    // console.log(id);
    wx.navigateTo({
      url: '../newHouseDetail/newHouseDetail?id='+id,
    })
  },
  onLoad: function () {
   this.getHomeData();
   this.getImgData();
   wx.setNavigationBarTitle({
     title: '广州宏居新房网',
   })
  },
  onShareAppMessage: function(){
    return{
      title: '广州宏居新房网',
      path: 'pages/index/index'
    }
  }
})
