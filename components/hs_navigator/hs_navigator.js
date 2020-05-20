// components/hs_navigator/hs_navigator.js

Component({
    behaviors: [],

    properties: {
        leftBarList: {
            type: Array,
            value: [],
        },
        titleBarList: {
            type: Array,
            value: [],
        },
        background_color: {
            type: String,
            value: '#000000',
        },
    },
    data: {
        statusHeight: 22,
        navigatorBarHeight: 44,
    }, // 私有数据，可用于模版渲染

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            this.getNavigatorHeight()
        },
        moved: function () { },
        detached: function () { },
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function () { },

    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () { },
    },

    methods: {
        leftBarTap: function (e) {
            console.log("选择", e);
            let index = parseInt(e.currentTarget.dataset.index)
            this.triggerEvent('LeftBarTap', {
                index: index,
            });
        },
        titleBarTap: function (e) {
            let index = parseInt(e.currentTarget.dataset.index)
            this.triggerEvent('TitleBarTap', {
                index: index,
            });
        },
        getNavigatorHeight: function () {
            let that = this
            let sysinfo = wx.getSystemInfoSync()
            let statusHeight = sysinfo.statusBarHeight
            let is_iOS = sysinfo.system.indexOf('iOS') > -1
            let navigatorBarHeight = 48
            if (is_iOS) {
                navigatorBarHeight = 44
            }
            that.setData({
                statusHeight: statusHeight,
                navigatorBarHeight: navigatorBarHeight
            })
            this.triggerEvent('NavigatorHeight', {
                navigatorHeight: statusHeight + navigatorBarHeight
            });
        },


    }
})
