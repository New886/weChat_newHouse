// pages/newHouseList/newHouseList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showindex: null,
    showshadow: false,
    addrindex: 0,
    priceindex: 0,
    roomindex: 0,
    typeindex: 0,
    featureindex: 0,
    sellindex:0,
    addr:'区域',
    price: '售价',
    room:'房型',
    listData:{},
    menuData: {},
    featureText: '',
    stateText: '',
    hidden: true,
    noMore: 'none',
    noData: 'none'
  },
  // 点击选项卡改变状态、样式
  showFiltrate: function(e){
    var index = e.currentTarget.dataset.findex;
    if(this.data.showindex == index){
      this.setData({
        showshadow: false,
        showindex: null
      })
    }else{
      this.setData({
        showshadow: true,
        showindex: index
      })
    }
    // console.log(this.data.showindex);
  },
  // 隐藏蒙版
  hiddenshadow: function(){
    this.setData({
      showshadow: false,
      showindex: null
    })
  },
  // 获取区域的下标及文本内容
  getAddrindex: function(e){
    var addrindex = e.currentTarget.dataset.addrindex;
    // console.log(addrindex);
    var addr = this.data.menuData.quyu[addrindex];
    this.setData({
      addrindex: addrindex,
      addr: addr
    })
    this.getListData();
    this.hiddenshadow();
  },
  // 获取售价下标及文本内容
  getPriceindex: function(e){
    var priceindex = e.currentTarget.dataset.priceindex;
    var price = this.data.menuData.junjia[priceindex];
    this.setData({
      priceindex: priceindex,
      price: price
    })
    this.getListData();
    this.hiddenshadow();
  },
  // 获取房型下标及文本内容
  getRoomindex: function(e){
    var roomindex = e.currentTarget.dataset.roomindex;
    var room = this.data.menuData.fangxing[roomindex]
    this.setData({
      roomindex:roomindex,
      room: room
    })
    this.getListData();
    this.hiddenshadow();
  },
  // 获取特色下标及文本内容
  getFeatureindex: function (e) {
    var featureindex = e.currentTarget.dataset.featureindex;
    var featureText = this.data.menuData.tedian[featureindex]
    this.setData({
      featureindex: featureindex,
      featureText: featureText
    })
    // console.log(featureText);
  },
  // 获取售卖状态下标及文本内容
  getSellindex: function(e){
    var sellindex = e.currentTarget.dataset.sellindex;
    var stateText = this.data.menuData.zhuangtai[sellindex]
    this.setData({
      sellindex: sellindex,
      stateText: stateText
    })
    // console.log(stateText)
  },
  // 重置按钮
  reset: function(){
    this.setData({
      typeindex: 0,
      featureindex: 0,
      sellindex: 0
    })
  },
  // 确认按钮
  sureBtn: function(){
    this.getListData();
    this.hiddenshadow();
  },
  // 获取列表数据
  getListData:function(){
    var that = this;
    if(that.data.price != "售价"){
      var price = that.data.price;
    }else{
      var price = that.data.price;
    }
    if (that.data.room != "房型") {
      var typeHose = that.data.room;
    } else {
      var typeHose = that.data.houseType;
    }
    if (that.data.stateText != "不限") {
      var state = that.data.stateText;
    } else {
      var state = that.data.state;
    }
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/xinfangloupan',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      data: {
        quyu: that.data.addr,
        junjia: price,
        fangxing: typeHose,
        tedian: that.data.featureText,
        zhuangtai: that.data.stateText,
        count: 0
      },
      success: function(res){
        console.log(res.data);
        var listArr = [];
        for (var i in res.data) {
          listArr.push(res.data[i]);
        }
        that.setData({
          listData: listArr,
          noMore: 'none'
        })
        if(res.data == null){
          that.setData({
            noData: 'block'
          })
        }else{
          that.setData({
            noData: 'none'
          })
        }
        // console.log(that.data.listData);
        // console.log(that.data.items);
      }
    })
  },
  // 获取菜单数据
  getMenuData: function(){
    var that = this;
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/xinfangloupan_caidan',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      success: function(res){
        console.log(res.data);
        that.setData({
          menuData:res.data
        })
      }
    })
  },
  // 加载更多
  loadMore: function(){
    var that = this;
    // 加载的时候首先显示加载更多的文字，改变隐藏状态
    this.setData({
      hidden: false
    })
    // 再进行一遍数据请求,将已经显示的数据与加载后的数据拼接
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/xinfangloupan',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'POST',
      data:{
        quyu: that.data.addr,
        junjia: that.data.price,
        fangxing: that.data.room,
        tedian: that.data.featureText,
        zhuangtai: that.data.stateText,
        count: that.data.listData.length
      },
      success: function(res){
        var data = res.data;
        // console.log(data);
        that.setData({
          data: data
        })
        var arr = [];
        for(var i in data){
          arr.push(data[i]);
        }
        // console.log(arr);
        // console.log(that.data.listData);
        if(data){
          that.setData({
            listData: that.data.listData.concat(arr)
          })
        }else{
          that.setData({
            hidden: true
          })
        }
      }
    })
  },
  // 跳转到详情页
  toNewHouseDetail: function(e){
    var id = e.currentTarget.id;
    // console.log(id);
    wx.navigateTo({
      url: '../newHouseDetail/newHouseDetail?id='+id,
    })
  },
  // 跳转到搜索页面
  tosearch: function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var price = options.price;
    var houseType = options.houseType;
    var state = options.state;
    this.setData({
      price: price,
      houseType:houseType,
      state:state
    })
    this.getListData();
    this.getMenuData();
    var id = options.id;
    var data = {
      id: id
    }
    wx.setNavigationBarTitle({
      title: '新房_宏居网',
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
    if(this.data.data){
      this.setData({
        hidden: true
      })
    }
    // var count = this.data.listData.length;
    // this.setData({
    //   count: count
    // })
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})