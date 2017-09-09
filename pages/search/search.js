// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    noMore: 'none',
    noData: 'none'
  },
  getInputInfo: function(e){
    var inputInfo = e.detail.value;
    // console.log(inputInfo);
    this.setData({
      inputInfo: inputInfo
    })
    this.getDataList();
  },
  // 获取数据
  getDataList:function(){
    var that = this;
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/xinfangloupan_search',
      dataType: 'json',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data:{
        s: that.data.inputInfo,
        count: 0
      },
      success: function(res){
        // console.log(res.data);
        var listDataArr = [];
        for(var i in res.data){
          listDataArr.push(res.data[i])
        }
        that.setData({
          listData: listDataArr
        })
        
      }
    })
  },
  // 加载更多
  loadMore: function(){
    var that = this;
    
    wx.request({
      url: 'https://www.hjw68.com/wp-json/get/v1/xinfangloupan_search',
      dataType: 'json',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        s: that.data.inputInfo,
        count: that.data.listData.length
      },
      success: function(res){
        that.setData({
          hidden: false
        })
        // console.log(res.data);
        var data = res.data;
        that.setData({
          data:res.data
        })
        var moreArr = [];
        for(var i in res.data){
          moreArr.push(res.data[i])
        }
        // console.log(moreArr);
        if(res.data){
          that.setData({
            listData: that.data.listData.concat(moreArr)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if(this.data.data == null){
      this.setData({
        hidden: true
      })
    }
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})