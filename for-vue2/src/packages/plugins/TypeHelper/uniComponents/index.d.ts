/* eslint-disable semi */
import * as View from './view';
import * as Base from './base';
import * as Form from './form';
import * as Navigator from './navigator';
import * as Media from './media';
import * as Map from './map';
import * as Canvas from './canvas';
import * as WebView from './webView';
import * as Ad from './ad';
import * as Db from './db';
import * as Page from './page';
import * as Mini from './mini';

export * from './view';
export * from './base';
export * from './form';
export * from './navigator';
export * from './media';
export * from './map';
export * from './canvas';
export * from './webView';
export * from './ad';
export * from './db';
export * from './page';
export * from './mini';

export default interface UniComponents {
  // view
  'View': View.View;
  'scroll-view': View.ScrollView;
  'swiper': View.Swiper;
  'match-media': View.matchMedia;
  'movable-area': View.movableArea;
  'movable-view': View.movableView;
  'cover-view': View.coverView;
  'cover-image': View.coverImage;

  // base
  'icon': Base.Icon;
  'text': Base.Text;
  'rich-text': Base.RichText;
  'progress': Base.Progress;

  // form
  'Button': Form.Button;
  'checkbox-group': Form.CheckboxGroup;
  'checkbox': Form.Checkbox;
  'editor': Form.Editor;
  'Form': Form.Form;
  'Input': Form.Input;
  'label': Form.Label;
  'picker': Form.Picker;
  'picker-view': Form.PickerView;
  'picker-view-column': Form.PickerViewColumn;
  'radio-group': Form.RadioGroup;
  'radio': Form.Radio;
  'slider': Form.Slider;
  'switch': Form.Switch;
  'textarea': Form.Textarea;

  // navigator
  'navigator': Navigator.Navigator;

  // media
  'animation-view': Media.AnimationView;
  'audio': Media.Audio;
  'camera': Media.Camera;
  'image': Media.Image;// TODO
  'video': Media.Video;
  'live-player': Media.LivePlayer;
  'live-pusher': Media.LivePusher;

  // map
  'map': Map.Map;

  // canvas
  'canvas': Canvas.Canvas;

  // webView
  'web-view': WebView.WebView;

  // ad
  'ad': Ad.Ad;
  'ad-rewarded-video': Ad.AdRewardedVideo;
  'ad-fullscreen-video': Ad.AdFullscreenVideo;
  'ad-interstitial': Ad.AdInterstitial;
  'ad-draw': Ad.AdDraw;
  'ad-content-page': Ad.AdContentPage;
  'ad-interactive': Ad.AdInteractive;

  // db
  'unicloud-db': Db.UnicloudDb;

  // page
  'page-meta': Page.PageMeta;
  'navigation-bar': Page.NavigationBar;
  'custom-tab-bar': Page.CustomTabBar;

  // mini
  'official-account': Mini.OfficialAccount;
  'open-data': Mini.OpenData;

}
