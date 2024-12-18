import { ref, onMounted } from 'vue'; // vue相关方法
import 'ol/ol.css'; // 地图样式
import { Map, View } from 'ol'; // 地图实例方法、视图方法
import Tile from 'ol/layer/Tile'; // 瓦片渲染方法
import { XYZ, OSM } from 'ol/source';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import { Translate } from 'ol/interaction';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';

import ico from './ico.ico';

let map = null; // 存放地图实例
const posX = 113.37310399318999;
const posY = 23.12297649456611;

// 初始化地图
export const initMap = () => {
  // 地图实例
  map = new Map({
    target: 'map', // 对应页面里 id 为 map 的元素
    layers: [
      // 图层
      new Tile({
        // 使用瓦片渲染方法 图层数据源
        // source: new OSM(), // OSM不能在实际开发中使用，因为OSM里中国地图的边界有点问题
        source: new XYZ({ url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}' }), // 使用高德
      }),
    ],
    view: new View({
      // 地图视图
      projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3857
      center: [posX, posY], // 中心坐标
      minZoom: 0, // 最小缩放级别
      maxZoom: 18, // 最大缩放级别
      zoom: 15, // 地图缩放级别（打开页面时默认级别）
      constrainResolution: true, // 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
    }),
    controls: defaults().extend([
      new FullScreen(), // 全屏
      new MousePosition(), // 显示鼠标当前位置的经纬度
      new ScaleLine(), // 显示比例尺
    ]),
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]), // 按住Shift可旋转
  });
};

// 给地图添加元素
export const addOverlay = () => {
  // 你可以给元素添加任意的内容或属性或样式，也可以给元素绑定事件
  let el = document.createElement('div');
  el.className = 'w28 h28 br50 bc7 fc c0 hp';
  el.textContent = '1';
  let marker = new Overlay({
    element: el, // 要显示的元素
    position: fromLonLat([posX, posY], 'EPSG:4326'), // 地图投影的位置
    offset: [0, 0], // 元素显示的像素偏移量
    autoPan: true, // 自动移动地图以完整的显示元素
  });
  // 添加到地图
  map.addOverlay(marker);
  // 从地图上删除
  // map.removeOverlay(marker);
};

// 给地图添加图片
export const addOverlay2 = () => {
  // 实例化要素
  let feature = new Feature({
    geometry: new Point([posX, posY]), // 地理几何图形选用点几何
  });
  // 设置样式，这里就是显示一张图片icon
  feature.setStyle([
    new Style({
      image: new Icon({
        anchor: [0, 0], // 显示位置
        // size: [20, 20], // 尺寸
        src: ico, // 图片url
        offset: [0, 0], // 元素显示的像素偏移量
      }),
    }),
  ]);
  // 矢量源
  let source = new VectorSource({ features: [feature] }); // 实例化的时候也可以不添加feature，后续通过方法添加：source.addFeatures([feature])

  // 矢量图层
  let vector = new VectorLayer({ source });
  // translateFeature(vector); // 可拖动
  // 样式除了可以设置在单个feature上，也可以统一设置在矢量图层上
  // let vector = new VectorLayer({
  //   source,
  //   style: new Style({
  //     image: new Icon({
  //       anchor: [10, 0], // 显示位置
  //       // size: [20, 20], // 尺寸
  //       src: ico, // 图片url
  //     }),
  //   }),
  // });

  map.addLayer(vector);
  // source.clear(); // 清空feature
};

// feature可拖动并监听
const translateFeature = (feature) => {
  let translate = new Translate({ layers: [feature] });
  map.addInteraction(translate);
  translate.on('translateend', (e) => {
    console.log(e);
  });
  translate.on('translatestart', (e) => {
    console.log(e);
  });
};

// 地图标点添加提示弹窗
export const showTip = () => {
  // 创建Overlayer
  this.tooltipOverlay = new Overlay({
    element: this.$refs.olPopup,
    positioning: 'bottom-center', // 根据position属性的位置来进行相对点位
    offset: [0, -30], // 在positioning之上再进行偏移
    autoPan: true,
  });
  map.addOverlay(this.tooltipOverlay);

  // 给地图绑定鼠标移动事件，检测鼠标位置所在是否存在feature，如果是目标feature的话就显示tooltip
  map.on('pointermove', (e) => {
    this.olPopupText = '';
    map.forEachFeatureAtPixel(e.pixel, (f, layer) => {
      if (layer !== this.vectorLayer || !f.get('data')) {
        return false;
      }
      this.olPopupText = f.get('data');
      this.tooltipOverlay.setPosition(f.getGeometry().getCoordinates());
    });
  });
};
