import 'ol/ol.css';
import { Map, View, Overlay, Feature } from 'ol';
import { XYZ, OSM, Cluster } from 'ol/source';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer, Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle, Text } from 'ol/style';
import { Translate } from 'ol/interaction';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import { boundingExtent } from 'ol/extent';
import KML from 'ol/format/KML.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';

export default class olMap {
  map = null;
  source = null;
  vector = null;
  constructor(options) {
    this.initMap(options);
  }
  // 初始化地图
  initMap(options) {
    let { domId, position, source, zoom = 15 } = options;
    source = source ? new XYZ({ url: source }) : new OSM();
    this.map = new Map({
      target: domId,
      layers: [new TileLayer({ source })],
      view: new View({ projection: 'EPSG:4326', center: position, minZoom: 0, maxZoom: 18, zoom, constrainResolution: true }),
      controls: defaults().extend([new FullScreen(), new MousePosition(), new ScaleLine()]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    });
  }
  // 添加默认图层
  addLayer() {
    this.source = new VectorSource({});
    this.vector = new VectorLayer({ source: this.source });
    this.map.addLayer(this.vector);
  }
  // 添加feature 必传:position,id
  addFeature(options) {
    const { position, name, id, data } = options;
    const feature = new Feature({ geometry: new Point(position), name });
    const style = [new Style({ image: new Circle({ radius: 14, stroke: new Stroke({ color: '#fff' }), fill: new Fill({ color: '#003460' }) }) })];
    feature.setStyle(style);
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
  // 根据坐标数组生成feature
  initFeatureList(featureList) {
    const res = [];
    for (const i of featureList) {
      res.push(new Feature(new Point(i)));
    }
    return res;
  }
  // 添加聚类图图层
  initCluster(featureList = []) {
    const features = featureList.map((i) => {
      return new Feature(new Point(i));
    });
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
    this.map.addLayer(clusters);
    // 点击feature会放大查看
    this.map.on('click', (e) => {
      clusters.getFeatures(e.pixel).then((clickedFeatures) => {
        if (clickedFeatures.length) {
          const features = clickedFeatures[0].get('features');
          if (features.length > 1) {
            const extent = boundingExtent(features.map((r) => r.getGeometry().getCoordinates()));
            this.map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
          }
        }
      });
    });
  }
  // 添加热力图图层
  initHeatmap(featureList = []) {
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
    this.map.addLayer(heatmap);
  }
}
