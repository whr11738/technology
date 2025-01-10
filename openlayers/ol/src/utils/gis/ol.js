import 'ol/ol.css';
import { Map, View, Overlay, Feature } from 'ol';
import { XYZ, OSM, Cluster } from 'ol/source';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import * as proj from 'ol/proj';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer, Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle, Text } from 'ol/style';
import { Translate } from 'ol/interaction';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import { boundingExtent } from 'ol/extent';
import KML from 'ol/format/KML.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';

// 初始化地图
export const initMap = (options) => {
  let { target = 'mapDom', center = [0, 0], source, zoom = 0, showFullScreen = true, showMousePosition = true, showScaleLine = true } = options;
  center[0] = Number(center[0]);
  center[1] = Number(center[1]);
  source = source ? new XYZ({ url: source }) : new OSM();
  const controlsArr = [];
  if (showFullScreen) controlsArr.push(new FullScreen());
  if (showMousePosition) controlsArr.push(new MousePosition());
  if (showScaleLine) controlsArr.push(new ScaleLine());
  return new Map({
    target,
    layers: [new TileLayer({ source })],
    view: new View({
      projection: 'EPSG:4326', // 支持 EPSG:4326 和 EPSG:3857(默认)
      center,
      minZoom: 0,
      maxZoom: 18,
      zoom,
      constrainResolution: true,
    }),
    controls: defaults().extend(controlsArr), // 地图控件
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]), // 按住Shift旋转地图
  });
};
// 获取所有图层
export const getLayerList = (map) => map.getLayers().getArray();
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
// 添加默认图层 图层名字默认为default
export const addDefaultLayer = (map, name = 'default') => {
  const source = new VectorSource({});
  const layer = new VectorLayer({ source, name });
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
  const { position, id, name, data } = options;
  const feature = new Feature({ geometry: new Point(position), name });
  const style = [new Style({ image: new Circle({ radius: 14, stroke: new Stroke({ color: '#fff', width: 2 }), fill: new Fill({ color: '#003460' }) }) })];
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
// 添加overlay position为空就是暂时不出现
export const addOverlay = (map, domId, position = 'null', positioning = 'bottom', offset = [0, 0]) => {
  const marker = new Overlay({
    element: document.getElementById(domId),
    positioning,
    position: position ? proj.fromLonLat(position, 'EPSG:4326') : null,
    offset,
    autoPan: true,
    stopEvent: false,
  });
  map.addOverlay(marker);
  return marker;
};
// 点击/悬浮 任意feature显示overlay
export const showOverlay = (map, options) => {
  const { overlay, callback, method = 'singleclick' } = options; // method 可选 pointermove
  map.on(method, (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    if (feature) {
      overlay.setPosition(feature.getGeometry().getCoordinates());
      if (callback) callback(feature);
    } else overlay.setPosition(undefined);
  });
};
// 点击/悬浮 某个feature显示overlay
export const featureShowOverlay = (map, options) => {
  const { feature, overlay, callback, method = 'singleclick' } = options; // method 可选 pointermove
  map.on(method, (e) => {
    const _feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    if (feature == _feature) {
      overlay.setPosition(feature.getGeometry().getCoordinates());
      if (callback) callback(feature);
    } else overlay.setPosition(undefined);
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
// 设置地图中心点
export const setCenter = (map, newCenter) => {
  const view = map.getView();
  // view.setCenter(newCenter);
  view.animate({ center: newCenter, duration: 1000, easing: (t) => 0.5 * (1 - Math.cos(Math.PI * t)) });
};
// 设置地图缩放等级
export const setZoom = (map, newZoom) => {
  const view = map.getView();
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
// 添加聚类图图层
export const initCluster = (map, featureList = []) => {
  const features = featureList.map((i) => new Feature(new Point(i)));
  const clusterSource = new Cluster({ source: new VectorSource({ features }) });
  clusterSource.setDistance(100);
  clusterSource.setMinDistance(50);
  const styleCache = {};
  const clusters = new VectorLayer({
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
// 添加热力图图层
export const initHeatmap = (map, featureList = []) => {
  const features = featureList.map((i) => {
    const feature = new Feature(new Point(i.position));
    feature.set('weight', i.weight);
    return feature;
  });
  const heatmapSource = new VectorSource({ format: new KML({ extractStyles: false }) });
  features.forEach((i) => {
    heatmapSource.addFeature(i);
  });
  const heatmap = new HeatmapLayer({ source: heatmapSource });
  heatmap.setBlur(5);
  heatmap.setRadius(15);
  map.addLayer(heatmap);
};
// 移除地图
export const delMap = (map) => map.dispose();
