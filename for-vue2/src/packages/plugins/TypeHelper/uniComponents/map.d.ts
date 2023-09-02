/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: 地图组件详细类型标注

/**
 * 地图组件。
 * - 地图组件用于展示地图，而定位API只是获取坐标，请勿混淆两者。
 * - 平台差异： 抖音小程序、飞书小程序（<1.63）、QQ小程序(<1.9.0+)、360小程序 不支持
 * - https://uniapp.dcloud.net.cn/component/map.html#
 */
export interface Map {
  props: {
    /**
     * 中心经度
     */
    longitude: number;

    /**
     * 中心纬度
     */
    latitude: number;

    /**
     * 缩放级别，取值范围为3-20
     * - 默认值： 16
     * - 平台差异： 高德地图缩放比例与微信小程序不同
     */
    scale: number;

    /**
     * 主题（satellite 或 normal）只在初始化时有效，不能动态变更（仅Android支持）
     * - 默认值： 'normal'
     * - 平台差异： 京东小程序
     */
    theme: string;

    /**
     * 最小缩放级别
     * - 默认值： 3
     * - 平台差异： App-nvue 3.1.0+、微信小程序2.13+
     */
    minScale: number;

    /**
     * 最大缩放级别
     * - 默认值： 20
     * - 平台差异： App-nvue 3.1.0+、微信小程序2.13+
     */
    maxScale: number;

    /**
     * 个性化地图
     * - 默认值： 1
     * - 平台差异： App-nvue 3.1.0+、微信小程序2.13+
     */
    layerStyle: number | string;

    /**
     * 标记点
     */
    markers: Array<any>;

    /**
     * 路线
     * - 平台差异： 飞书小程序不支持
     */
    polyline: Array<any>;

    /**
     * 圆
     */
    circles: Array<any>;

    /**
     * 控件
     */
    controls: Array<any>;

    /**
     * 缩放视野以包含所有给定的坐标点
     * - 平台差异： App-nvue 2.1.5+、微信小程序、H5、百度小程序、支付宝小程序、京东小程序
     */
    includePoints: Array<any>;

    /**
     * 是否显示3D楼块
     * - 默认值： false
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.3.0
     */
    enable3D: boolean;

    /**
     * 是否显示指南针
     * - 默认值： false
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.3.0
     */
    showCompass: boolean;

    /**
     * 是否支持缩放
     * - 默认值： true
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.3.0
     */
    enableZoom: boolean;

    /**
     * 是否支持拖动
     * - 默认值： true
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.3.0
     */
    enableScroll: boolean;

    /**
     * 是否支持旋转
     * - 默认值： false
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.3.0
     */
    enableRotate: boolean;

    /**
     * 是否开启俯视
     * - 默认值： false
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.3.0
     */
    enableOverlooking: boolean;

    /**
     * 是否开启卫星图
     * - 默认值： false
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.7.0
     */
    enableSatellite: boolean;

    /**
     * 是否开启实时路况
     * - 默认值： false
     * - 平台差异： App-nvue 2.1.5+、微信小程序2.7.0
     */
    enableTraffic: boolean;

    /**
     * 是否展示 POI 点
     * - 默认值： false
     * - 平台差异： App-nvue 3.1.0+
     */
    enablePOI: boolean;

    /**
     * 是否展示建筑物
     * - 默认值： false
     * - 平台差异： App-nvue 3.1.0+ 支持 (废除原enable-3D属性 高德地图默认开启建筑物就是3D无法设置)
     */
    enableBuilding: boolean;

    /**
     * 显示带有方向的当前定位点
     * - 平台差异： 微信小程序、H5、百度小程序、支付宝小程序、京东小程序
     */
    showLocation: boolean;

    /**
     * 多边形
     * - 平台差异： App-nvue 2.1.5+、App-vue 3.4.3+、H5 3.4.3+、微信小程序、百度小程序
     */
    polygons: Array<any>;

    /**
     * 多边形
     * - 平台差异：支付宝小程序
     */
    polygon: Array<any>;

    /**
     * 是否展示室内地图
     * - 默认值： false
     * - 平台差异： App-nvue 3.1.0+
     */
    enableIndoorMap: boolean;
  };
  events: {
    /**
     * 点击标记点时触发，e.detail = {markerId}
     * - 平台差异： App-nvue 2.3.3+、H5、微信小程序、支付宝小程序 （App和H5平台需要指定 marker 对象属性 id）
     */
    onMarkerTap: (e: { detail: { markerId; }; }) => void;

    /**
     * 点击label时触发，e.detail = {markerId}
     * - 平台差异： 微信小程序2.9.0
     */
    onLabelTap: (e: { detail: { markerId; }; }) => void;

    /**
     * 点击标记点对应的气泡时触发，e.detail = {markerId}
     */
    onCalloutTap: (e: { detail: { markerId; }; }) => void;

    /**
     * 点击控件时触发，e.detail = {controlId}
     */
    onControlTap: (e: { detail: { controlId; }; }) => void;

    /**
     * 视野发生变化时触发
     * - 平台差异： 微信小程序、H5、百度小程序、支付宝小程序、京东小程序
     */
    onRegionChange: () => void;

    /**
     * 点击地图时触发; App-nvue、微信小程序2.9支持返回经纬度
     */
    onTap: () => void;

    /**
     * 在地图渲染更新完成时触发
     * - 平台差异： 微信小程序、H5、百度小程序
     */
    onUpdated: () => void;

    /**
     * 点击定位标时触发，e.detail = {longitude, latitude}
     * - 平台差异： App-nvue 3.1.0+、微信小程序2.13+
     */
    onAnchorPointTap: (e: { detail: { longitude, latitude; }; }) => void;

    /**
     * 点击地图poi点时触发，e.detail = {name, longitude, latitude}
     * - 平台差异： 微信小程序2.3.0+
     */
    onPOITap: (e: { detail: { name, longitude, latitude; }; }) => void;
  };
}
