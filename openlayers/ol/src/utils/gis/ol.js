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
import { Style, Icon, Fill, Stroke, Circle, Text } from 'ol/style';
import { Translate } from 'ol/interaction';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';

import ico from './ico.ico';

export default class olMap {
  map = null;
  source = null;
  vector = null;
  constructor(options) {
    this.initMap(options);
  }
  // 初始化地图
  initMap(options) {
    this.map = new Map({
      target: options.dom,
      layers: [new Tile({ source: new XYZ({ url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}' }) })],
      view: new View({ projection: 'EPSG:4326', center: options.position, minZoom: 0, maxZoom: 18, zoom: 15, constrainResolution: true }),
      controls: defaults().extend([new FullScreen(), new MousePosition(), new ScaleLine()]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    });
  }
  // 添加图层
  addLayer() {
    this.source = new VectorSource({});
    this.vector = new VectorLayer({ source: this.source });
    this.map.addLayer(this.vector);
  }
  // 添加feature 必传:position,id
  addFeature(options, type = 'dot') {
    const { position, name, id, data } = options;
    const feature = new Feature({ geometry: new Point(position), name });
    // 标点
    const style1 = [
      new Style({
        image: new Circle({ radius: 14, stroke: new Stroke({ color: '#fff' }), fill: new Fill({ color: '#003460' }) }),
        // text: new Text({ textAlign: 'center', textBaseline: 'middle', font: 'bold 16px 微软雅黑', text: '1', fill: new Fill({ color: '#FFF' }) }),
      }),
    ];
    const style2 = [new Style({ image: new Icon({ anchor: [0, 0], src: ico, offset: [0, 0] }) })]; // 图片
    feature.setStyle(type == 'dot' ? style1 : style2);
    feature.setId(id);
    if (data) feature.setProperties(data); // 设置数据
    this.source.addFeatures([feature]);
  }
  // 根据id获取feature
  getFeature(featureId) {
    return this.source.getFeatureById(featureId);
  }
  // 根据id获取feature数据
  getFeatureData(featureId) {
    const feature = this.source.getFeatureById(featureId);
    return feature.getProperties();
  }
  // 获取feature列表
  getFeatureList() {
    return this.source.getFeatures();
  }
  // 根据id移除feature
  removeFeature(featureId) {
    const feature = this.source.getFeatureById(featureId);
    this.source.removeFeature(feature);
  }
  // 添加overlay
  addOverlay(id, position, positioning, offset = [0, 0]) {
    const marker = new Overlay({
      element: document.getElementById(id),
      positioning,
      position: position ? fromLonLat(position, 'EPSG:4326') : null,
      offset,
      autoPan: true,
      stopEvent: false,
    });
    this.map.addOverlay(marker);
    return marker;
  }
  // 删除overlay
  delOverlays(overlays) {
    return this.map.removeOverlay(overlays);
  }
  // 获取overlay列表
  getOverlays() {
    return this.map.getOverlays().array_;
  }
  // 点击feature显示弹窗
  singleclick(overlay, callback) {
    this.map.on('singleclick', (e) => {
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
      if (feature) {
        overlay.setPosition(feature.getGeometry().getCoordinates());
        if (callback) callback(feature);
      } else overlay.setPosition(undefined);
    });
  }
  // 悬浮feature添加样式
  pointermove() {
    this.map.on('pointermove', (e) => {
      if (this.map.hasFeatureAtPixel(e.pixel)) this.map.getViewport().style.cursor = 'pointer';
      else this.map.getViewport().style.cursor = 'inherit';
    });
  }
}