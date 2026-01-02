import 'ol/ol.css';
import { Map, View, Overlay, Feature } from 'ol';
import { XYZ, OSM, Cluster } from 'ol/source';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { Point, Polygon } from 'ol/geom';
import { circular } from 'ol/geom/Polygon';
import { Vector as VectorLayer, Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle, Text } from 'ol/style';
import { Translate, DragPan } from 'ol/interaction';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import { boundingExtent, getCenter } from 'ol/extent';
import KML from 'ol/format/KML.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import { GeoJSON } from 'ol/format';

// const { Map, View, Overlay, Feature } = ol;
// const { XYZ, OSM, Cluster } = ol.source;
// const { FullScreen, MousePosition, ScaleLine } = ol.control;
// const { defaults } = ol.control.defaults;
// const { fromLonLat } = ol.proj;
// const { Point, Polygon } = ol.geom;
// const { circular } = ol.geom.Polygon;
// const { Vector: VectorLayer, Heatmap: HeatmapLayer, Tile: TileLayer } = ol.layer;
// const { Vector: VectorSource } = ol.source;
// const { Style, Icon, Fill, Stroke, Circle, Text } = ol.style;
// const { Translate, DragPan } = ol.interaction;
// const { DragRotateAndZoom } = ol.interaction;
// const { defaults: defaultInteractions } = ol.interaction.defaults;
// const { boundingExtent, getCenter } = ol.extent;
// const KML = ol.format.KML.js;
// const { GeoJSON } = ol.format;

// 地图瓦片
// window.mapSource = 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'; // 只显示国内
// window.mapSource = 'http://canary.tm.trsdsj.cn/tmMap/map/baidumaps/roadmap10_12/{z}/{x}/{y}.png'; // 百度
// window.mapSource = 'https://ggmap.tmapi.trsdsj.cn/tiles/{z}/{x}/{y}.jpg'; // 谷歌1
// window.mapSource = 'https://ggm.tmapi.trsdsj.cn/tiles/{z}/{x}/{y}.jpg'; // 谷歌2
// window.mapSource = 'https://ggsm.tmapi.trsdsj.cn/tiles/{z}/{x}/{y}.jpg'; // 谷歌卫星
// window.mapSource = 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'; // 高德矢量底图
// window.mapSource = 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'; // 高德卫星影像
// window.mapSource = 'https://webst04.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'; // 高德路网注记
// window.mapSource = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'; // 免费卫星地图瓦片
// window.mapSource = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // 免费地图瓦片

// 初始化地图
export const initMap = (options) => {
  let { target = 'mapDom', center = [0, 0], source, zoom = 0, showZoom = true, showFullScreen = true, showMousePosition = true, showScaleLine = true, loopMap = false } = options;
  center[0] = Number(center[0]);
  center[1] = Number(center[1]);
  source = source ? new XYZ({ url: source }) : new OSM();
  const controlsArr = [];
  if (showFullScreen) controlsArr.push(new FullScreen()); // 全屏按钮
  if (showMousePosition) controlsArr.push(new MousePosition()); // 右上角显示坐标
  if (showScaleLine) controlsArr.push(new ScaleLine()); // 比例尺
  // 视图配置
  const viewOptions = {
    projection: 'EPSG:4326', // 支持 EPSG:4326 和 EPSG:3857(默认)
    center,
    minZoom: 0,
    maxZoom: 18,
    zoom,
    constrainResolution: true,
  };
  if (!loopMap) viewOptions.extent = [-180, -90, 180, 90]; // 设置地图的视图范围，限制地图的滚动范围（世界地图不循环）
  // 地图配置
  const mapOptions = {
    target,
    layers: [new TileLayer({ source })],
    view: new View(viewOptions),
    controls: defaults({ zoom: showZoom }).extend(controlsArr), // 地图控件
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]), // 按住Shift旋转地图
  };
  const map = new Map(mapOptions);
  map.addInteraction(new DragPan()); // 将 DragPan 交互添加到地图中
  map.mapDom = document.getElementById(target); // 将地图容器dom也放进去
  return map;
};
// 切换瓦片
export const changeSource = (map, newUrl) => {
  console.log('map', map);
  const layer = map.getLayers().item(0);
  const source = layer.getSource();
  source.setUrl(newUrl);
};
// 允许/禁止 拖拽地图
export const dragMap = (map, draggable = false) => {
  map.getInteractions().forEach((interaction) => {
    if (interaction instanceof DragPan) interaction.setActive(draggable);
  });
};
// 获取所有图层
export const getLayerList = (map) => {
  const res = map.getLayers().getArray();
  for (const i of res) {
    console.log(i.get('type'), i.get('name'), i);
  }
  return res;
};
// 移除图层 传入key和val,可以根据type或name来移除
export const delLayer = (map, options) => {
  const { key, val } = options;
  const layersArray = map.getLayers().getArray().slice();
  layersArray.forEach((i, _i) => {
    if (i.get(key) == val) map.removeLayer(i);
  });
};
// 移除所有图层 保留基础地图图层
export const delAllLayer = (map) => {
  const layersArray = map.getLayers().getArray().slice();
  layersArray.forEach((i, _i) => {
    if (_i !== 0) map.removeLayer(i);
  });
};
// 根据名字获取图层
export const getLayer = (map, name = 'default') => {
  for (const i of map.getLayers().getArray()) {
    if (i.get('name') === name) return i;
  }
  return null;
};
// 添加默认图层
export const addDefaultLayer = (map) => {
  const source = new VectorSource({});
  const layer = new VectorLayer({ source, name: 'default', type: '默认图层', zIndex: 2 });
  map.addLayer(layer);
};
// 获取默认图层的source
export const getDefaultSource = (map) => {
  if (!getLayer(map)) addDefaultLayer(map); // 如果没有默认图层 添加默认图层
  const layer = getLayer(map);
  const source = layer.getSource();
  return source;
};
// 添加feature options必传:position,id
export const addFeature = (map, options) => {
  const { position, id, name, data, img } = options;
  const feature = new Feature({ geometry: new Point(position), name });
  let style = null;
  if (img) style = new Style({ image: new Icon({ src: img, anchor: [0.5, 0.5], scale: 1 }) });
  else style = new Style({ image: new Circle({ radius: 14, stroke: new Stroke({ color: '#fff', width: 2 }), fill: new Fill({ color: '#003460' }) }) });
  feature.setStyle(style);
  feature.setId(id);
  if (data) feature.setProperties(data); // 设置数据
  getDefaultSource(map).addFeatures([feature]);
  return feature;
};
// 根据id获取feature
export const getFeature = (map, featureId) => getDefaultSource(map).getFeatureById(featureId);
// 获取feature数据
export const getFeatureData = (feature) => feature.getProperties();
// 获取feature列表
export const getFeatureList = (map) => getDefaultSource(map).getFeatures();
// 根据id移除feature
export const removeFeature = (map, featureId) => {
  const feature = getDefaultSource(map).getFeatureById(featureId);
  getDefaultSource(map).removeFeature(feature);
};
// 根据id修改feature位置
export const changeFeaturePosition = (map, options) => {
  const { id, position } = options;
  getFeature(map, id).getGeometry().setCoordinates(position);
};
// 给feature添加文字
export const addFeatureText = (feature, text) => {
  const currentStyle = feature.getStyle();
  const textStyle = new Text({
    text,
    font: '12px Arial', // 字体样式
    fill: new Fill({ color: 'black' }), // 文字颜色
    // stroke: new Stroke({ color: 'white', width: 1 }), // 文字描边
    textAlign: 'center', // 水平对齐方式
    textBaseline: 'bottom', // 垂直对齐方式
    offsetX: 0, // 水平偏移
    offsetY: -15, // 垂直偏移
  });
  feature.setStyle(new Style({ text: textStyle, ...(currentStyle?.getImage() ? { image: currentStyle.getImage() } : {}) }));
};
// 删除feature的文字
export const delFeatureText = (feature) => {
  const currentStyle = feature.getStyle();
  const newStyleObj = new Style({
    image: currentStyle.getImage && currentStyle.getImage(),
    fill: currentStyle.getFill && currentStyle.getFill(),
    stroke: currentStyle.getStroke && currentStyle.getStroke(),
    circle: currentStyle.getCircle && currentStyle.getCircle(),
    zIndex: currentStyle.getZIndex && currentStyle.getZIndex(),
  });
  feature.setStyle(newStyleObj);
};

// 添加overlay position为空就是暂时不出现
export const addOverlay = (map, domId, position = 'null', positioning = 'bottom', offset = [0, 0]) => {
  const marker = new Overlay({
    element: document.getElementById(domId),
    positioning, // 定位方式
    position: position ? fromLonLat(position, 'EPSG:4326') : null, // 位置
    offset: [0, 0], // 偏移量
    autoPan: false, //  是否自动平移地图以确保Overlay完全可见
    stopEvent: false,
  });
  map.addOverlay(marker);
  return marker;
};
// 点击/悬浮 任意feature显示overlay
export const showOverlay = (map, options) => {
  const { overlay, callback, method = 'singleclick' } = options; // method 可选 pointermove singleclick
  const overlayDom = overlay.getElement();
  overlayDom.addEventListener('mouseenter', () => {
    dragMap(map, false); // 鼠标移动进 overlay 时阻止地图拖拽，用于可选取 overlay 中文本
  });
  overlayDom.addEventListener('mouseleave', () => {
    dragMap(map, true); // 鼠标移动出 overlay 时允许地图拖拽
  });
  map.on(method, (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    const coordinate = e.coordinate; // 获取点击事件的坐标
    const pixel = map.getPixelFromCoordinate(coordinate);
    const rect = map.mapDom.getBoundingClientRect(); // 计算地图容器相对于视口的位置
    const viewportX = pixel[0] + rect.left + window.scrollX; // 将地图的像素坐标转换为视口坐标
    const viewportY = pixel[1] + rect.top + window.scrollY; // 将地图的像素坐标转换为视口坐标
    const clickedElement = document.elementFromPoint(viewportX, viewportY); // 使用转换后的坐标获取最顶层的 DOM 元素
    const isClickOnOverlay = clickedElement === overlayDom || overlayDom.contains(clickedElement); // 检查点击的元素是否有 overlay
    if (feature) {
      // overlayDom超出地图边界时自动调整位置
      const x = overlayDom.clientWidth + viewportX > rect.width ? -1 * overlayDom.clientWidth : 0;
      const y = overlayDom.clientHeight + viewportY > rect.height ? -1 * overlayDom.clientHeight : 0;
      overlay.setOffset([x, y]);

      overlay.setPosition(feature.getGeometry().getCoordinates());
      if (callback) callback(feature);
    } else {
      if (!isClickOnOverlay) overlay.setPosition(undefined); // 点击 overlay 以外的地方 overlay 消失
    }
  });
};
// 点击/悬浮 某个feature显示overlay
export const featureShowOverlay = (map, options) => {
  const { feature, overlay, callback, method = 'singleclick' } = options; // method 可选 pointermove singleclick
  const overlayDom = overlay.getElement();
  overlayDom.addEventListener('mouseenter', () => {
    dragMap(map, false); // 鼠标移动进 overlay 时阻止地图拖拽，用于可选取 overlay 中文本
  });
  overlayDom.addEventListener('mouseleave', () => {
    dragMap(map, true); // 鼠标移动出 overlay 时允许地图拖拽
  });
  map.on(method, (e) => {
    const _feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    const coordinate = e.coordinate; // 获取点击事件的坐标
    const pixel = map.getPixelFromCoordinate(coordinate);
    const rect = map.mapDom.getBoundingClientRect(); // 计算地图容器相对于视口的位置
    const viewportX = pixel[0] + rect.left + window.scrollX; // 将地图的像素坐标转换为视口坐标
    const viewportY = pixel[1] + rect.top + window.scrollY; // 将地图的像素坐标转换为视口坐标
    const clickedElement = document.elementFromPoint(viewportX, viewportY); // 使用转换后的坐标获取最顶层的 DOM 元素
    const isClickOnOverlay = clickedElement === overlayDom || overlayDom.contains(clickedElement); // 检查点击的元素是否有 overlay
    if (feature == _feature) {
      // overlayDom超出地图边界时自动调整位置
      const x = overlayDom.clientWidth + viewportX > rect.width ? -1 * overlayDom.clientWidth : 0;
      const y = overlayDom.clientHeight + viewportY > rect.height ? -1 * overlayDom.clientHeight : 0;
      overlay.setOffset([x, y]);

      overlay.setPosition(feature.getGeometry().getCoordinates());
      if (callback) callback(feature);
    } else {
      if (!isClickOnOverlay) overlay.setPosition(undefined); // 点击 overlay 以外的地方 overlay 消失
    }
  });
};
// 移除overlay
export const delOverlay = (map, overlays) => map.removeOverlay(overlays);
// 获取所有overlay
export const getOverlayList = (map) => map.getOverlays().array_;
// 悬浮feature时候鼠标变手
export const featurePointer = (map) => {
  map.on('pointermove', (e) => {
    if (map.hasFeatureAtPixel(e.pixel)) map.getViewport().style.cursor = 'pointer';
    else map.getViewport().style.cursor = 'inherit';
  });
};
// 设置地图中心点 callback:回调函数
export const setCenter = (map, newCenter, callback) => {
  const view = map.getView();
  // view.setCenter(newCenter);
  view.animate({ center: newCenter, duration: 1000, easing: (t) => 0.5 * (1 - Math.cos(Math.PI * t)) }, () => callback && callback());
};
// 设置地图缩放等级
export const setZoom = (map, newZoom = 0) => {
  const view = map.getView();
  const zoom = view.getZoom();
  if (zoom == newZoom) return;
  // view.setZoom(newZoom);
  view.animate({ zoom: newZoom, duration: 1000, easing: (t) => 0.5 * (1 - Math.cos(Math.PI * t)) });
};
// 设置地图旋转角度
export const setRotation = (map, newRotation) => {
  const view = map.getView();
  // view.setRotation(newRotation);
  view.animate({ rotation: newRotation, duration: 1000, easing: (t) => 0.5 * (1 - Math.cos(Math.PI * t)) });
};
// 设置最佳视图: 最佳中心点
export const bestCenter = (map, coords) => {
  if (coords.length === 0) return 0;
  let minLon = coords[0][0];
  let minLat = coords[0][1];
  let maxLon = coords[0][0];
  let maxLat = coords[0][1];
  coords.forEach((coord) => {
    minLon = Math.min(minLon, coord[0]);
    minLat = Math.min(minLat, coord[1]);
    maxLon = Math.max(maxLon, coord[0]);
    maxLat = Math.max(maxLat, coord[1]);
  });
  const bestCenter = [(minLon + maxLon) / 2, (minLat + maxLat) / 2];
  setCenter(map, bestCenter);
};
// 设置最佳视图: 最佳中心点 最佳缩放等级
export const bestView = (map, coords) => {
  if (coords.length === 0) return 0;
  let minLon = coords[0][0];
  let minLat = coords[0][1];
  let maxLon = coords[0][0];
  let maxLat = coords[0][1];
  coords.forEach((coord) => {
    minLon = Math.min(minLon, coord[0]);
    minLat = Math.min(minLat, coord[1]);
    maxLon = Math.max(maxLon, coord[0]);
    maxLat = Math.max(maxLat, coord[1]);
  });
  // const bestCenter = [(minLon + maxLon) / 2, (minLat + maxLat) / 2]; // 最佳中心点
  const view = map.getView();
  view.fit([minLon, minLat, maxLon, maxLat]);
};
// 添加聚类图图层 featureList:[[0, 0],[1, 1]]
export const initCluster = (map, featureList = []) => {
  const features = featureList.map((i) => new Feature(new Point(i)));
  const clusterSource = new Cluster({ source: new VectorSource({ features }) });
  clusterSource.setDistance(100);
  clusterSource.setMinDistance(50);
  const styleCache = {};
  const clusters = new VectorLayer({
    type: '聚类图',
    source: clusterSource,
    style: function (feature) {
      const size = feature.get('features').length;
      let style = styleCache[size];
      if (!style) {
        style = new Style({
          image: new Circle({ radius: 14, stroke: new Stroke({ color: '#fff' }), fill: new Fill({ color: '#003460' }) }),
          text: new Text({ textAlign: 'center', textBaseline: 'middle', font: 'bold 14px 微软雅黑', text: size.toString(), fill: new Fill({ color: '#fff' }) }),
        });
        styleCache[size] = style;
      }
      return style;
    },
  });
  map.addLayer(clusters);
  // 点击feature会放大查看
  map.on('click', (e) => {
    clusters.getFeatures(e.pixel).then((clickedFeatures) => {
      if (clickedFeatures.length) {
        const features = clickedFeatures[0].get('features');
        if (features.length > 1) {
          const extent = boundingExtent(features.map((r) => r.getGeometry().getCoordinates()));
          map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
        }
      }
    });
  });
};
// 添加热力图图层 featureList:[{position: [0, 0], weight: 1}]
export const initHeatmap = (map, featureList = []) => {
  const features = featureList.map((i) => {
    const feature = new Feature(new Point(i.position));
    feature.set('weight', i.weight); // 0到1之间
    return feature;
  });
  const heatmapSource = new VectorSource({ format: new KML({ extractStyles: false }) });
  features.forEach((i) => {
    heatmapSource.addFeature(i);
  });
  const heatmap = new HeatmapLayer({ type: '热力图', source: heatmapSource });
  heatmap.setBlur(5);
  heatmap.setRadius(15);
  map.addLayer(heatmap);
};
// 添加多边形围栏
export const addArea = (map, options) => {
  const { name, positionList, border = false, line = false } = options;
  const features = [new Feature({ geometry: new Polygon([positionList]) })];
  const source = new VectorSource({ features });
  const style = new Style({
    stroke: new Stroke({
      color: border ? '#4C99F8' : 'rgba(0, 0, 0,0)', // 边框颜色
      width: 2, // 边框宽度
      lineDash: [line ? 0 : 5], // 边框虚线长度
    }),
    fill: new Fill({ color: 'rgba(106, 199, 238,0.4)' }),
  });
  const areaLayer = new VectorLayer({ type: '多边形围栏', name, source, style, zIndex: 1 });
  map.addLayer(areaLayer);
  // 在范围中心显示名称
  if (!name) return;
  const center = getCenter(boundingExtent(positionList)); // 获取范围的中心点坐标
  const nameDom = document.createElement('div');
  nameDom.innerHTML = name;
  nameDom.className = 'nameDom';
  const nameOverlay = new Overlay({ element: nameDom, position: fromLonLat(center, 'EPSG:4326'), offset: [0, 0], positioning: 'bottom-center' });
  map.addOverlay(nameOverlay);
};
// 添加圆形围栏
export const addCircleArea = (map, options) => {
  const { name, position, radius = 1000, border = false, line = false, onClick } = options;
  const features = [new Feature({ geometry: circular(position, radius) })];
  const source = new VectorSource({ features });
  const style = new Style({
    stroke: new Stroke({
      color: border ? '#4C99F8' : 'rgba(0, 0, 0,0)', // 边框颜色
      width: 2, // 边框宽度
      lineDash: [line ? 0 : 5], // 边框虚线长度
    }),
    fill: new Fill({ color: 'rgba(106, 199, 238,0.4)' }),
  });
  const areaLayer = new VectorLayer({ type: '圆形围栏', name, source, style, zIndex: 1 });
  map.addLayer(areaLayer);
  // 添加点击事件
  if (onClick && typeof onClick === 'function') {
    const clickHandler = (event) => {
      const clickedCoordinate = event.coordinate;
      const geometry = features[0].getGeometry();
      // 检查点击位置是否在当前围栏内
      if (geometry.intersectsCoordinate(clickedCoordinate)) {
        event.stopPropagation(); // 阻止事件冒泡（可选）
        onClick(fenceInfo, event);
      }
    };
    map.on('click', clickHandler);
  }
  if (name) {
    // 在范围中心显示名称
    const nameDom = document.createElement('div');
    nameDom.innerHTML = name;
    nameDom.className = 'nameDom';
    const nameOverlay = new Overlay({ element: nameDom, position: fromLonLat(position, 'EPSG:4326'), offset: [0, 0], positioning: 'bottom-center' });
    map.addOverlay(nameOverlay);
  }
  const fenceInfo = {
    layer: areaLayer,
    source: source,
    feature: features[0],
    name: name,
    position: position,
    radius: radius,
  };
  return fenceInfo;
};
// 添加线段
export const addLine = (map, options) => {
  const { positionList, name } = options;
  const lineLayer = new VectorLayer({ type: '线段', name, source: new VectorSource(), zIndex: 1 });
  const feature = { type: 'Feature', geometry: { type: 'LineString', coordinates: positionList } };
  const features = new GeoJSON().readFeature(feature, { featureProjection: map.getView().getProjection() });
  lineLayer.getSource().addFeature(features);
  features.setStyle([new Style({ stroke: new Stroke({ color: 'green', width: 3 }) })]);
  map.addLayer(lineLayer);
};

// 根据id删除线段
export const delLine = (map, id) => {
  const layers = map.getLayers().getArray();
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (layer.get('id') === id) map.removeLayer(layer);
  }
};
// 删除所有线段图层（VectorLayer 类型）
export const delAllLines = (map) => {
  const layers = map.getLayers().getArray();
  const layersToRemove = [];
  layers.forEach((layer) => {
    if (layer instanceof VectorLayer) layersToRemove.push(layer);
  });
  layersToRemove.forEach((layer) => {
    map.removeLayer(layer);
  });
};

// 移除地图
export const delMap = (map) => map.dispose();
