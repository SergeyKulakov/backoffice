import * as PropTypes from "prop-types";

declare module "react-jvectormap" {
  import { Component } from "react";

  interface VectorMapProps {
    containerStyle?: object;
    containerClassName?: string;
    map: string;
    backgroundColor?: string;
    zoomOnScroll?: boolean;
    zoomOnScrollSpeed?: boolean;
    panOnDrag?: boolean;
    zoomMax?: number;
    zoomMin?: number;
    zoomStep?: number;
    zoomAnimate?: boolean;
    regionsSelectable?: boolean;
    regionsSelectableOne?: boolean;
    markersSelectable?: boolean;
    markersSelectableOne?: boolean;
    regionStyle?: object;
    regionLabelStyle?: object;
    markerStyle?: object;
    markerLabelStyle?: object;
    markers?: object | Array<any>;
    series?: object;
    focusOn?: string | object;
    labels?: object;
    selectedRegions?: Array<any> | object | string;
    selectedMarkers?: Array<any> | object | string;
    onRegionTipShow?: Function;
    onRegionOver?: Function;
    onRegionOut?: Function;
    onRegionClick?: Function;
    onRegionSelected?: Function;
    onMarkerTipShow?: Function;
    onMarkerOver?: Function;
    onMarkerOut?: Function;
    onMarkerClick?: Function;
    onMarkerSelected?: Function;
    onViewportChange?: Function;
    zoomButtons?: boolean;
  }

  export class VectorMap extends Component<VectorMapProps> {}
}
