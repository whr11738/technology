import 'ol/ol.css';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { XYZ, OSM } from 'ol/source';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle } from 'ol/style';
import { Translate } from 'ol/interaction';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';

import ico from './ico.ico';

let map = null;

// 初始化地图
export const initMap = (options) => {
  map = new Map({
    target: options.dom,
    layers: [new Tile({ source: new XYZ({ url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}' }) })],
    view: new View({ projection: 'EPSG:4326', center: options.position, minZoom: 0, maxZoom: 18, zoom: 15, constrainResolution: true }),
    controls: defaults().extend([new FullScreen(), new MousePosition(), new ScaleLine()]),
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
  });
};

// 添加标点
export const addLayer = (position) => {
  let feature = new Feature({ geometry: new Point(position) });
  feature.setStyle([new Style({ image: new Circle({ radius: 12, stroke: new Stroke({ color: '#fff' }), fill: new Fill({ color: '#003460' }) }) })]); // 添加标点
  // feature.setStyle([new Style({ image: new Icon({ anchor: [0, 0], src: ico, offset: [0, 0] }) })]); // 添加图片
  let source = new VectorSource({});
  source.addFeatures([feature]);
  let vector = new VectorLayer({ source });

  map.addLayer(vector);
};
// 添加overlay
export const addOverlay = (id, position, positioning, offset = [0, 0]) => {
  const marker = new Overlay({
    element: document.getElementById(id),
    positioning,
    position: position ? fromLonLat(position, 'EPSG:4326') : null,
    offset,
    autoPan: true,
    stopEvent: false,
  });
  map.addOverlay(marker);
  return marker;
};

// 删除overlay
export const delOverlays = (overlays) => map.removeOverlay(overlays);

// 获取overlay列表
export const getOverlays = () => map.getOverlays().array_;

// 点击feature显示弹窗
export const singleclick = (overlay) => {
  map.on('singleclick', (e) => {
    let feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    if (feature) overlay.setPosition(feature.getGeometry().getCoordinates());
    else overlay.setPosition(undefined);
  });
};
// 悬浮feature添加样式
export const pointermove = () => {
  map.on('pointermove', (e) => {
    if (map.hasFeatureAtPixel(e.pixel)) map.getViewport().style.cursor = 'pointer';
    else map.getViewport().style.cursor = 'inherit';
  });
};
