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
  View: View.View;
  ScrollView: View.ScrollView;
  Swiper: View.Swiper;
  MatchMedia: View.MatchMedia;
  MovableArea: View.MovableArea;
  MovableView: View.MovableView;
  CoverView: View.CoverView;
  CoverImage: View.CoverImage;

  // base
  Icon: Base.Icon;
  Text: Base.Text;
  RichText: Base.RichText;
  Progress: Base.Progress;

  // form
  Button: Form.Button;
  CheckboxGroup: Form.CheckboxGroup;
  Checkbox: Form.Checkbox;
  Editor: Form.Editor;
  Form: Form.Form;
  Input: Form.Input;
  Label: Form.Label;
  Picker: Form.Picker;
  PickerView: Form.PickerView;
  PickerViewColumn: Form.PickerViewColumn;
  RadioGroup: Form.RadioGroup;
  Radio: Form.Radio;
  Slider: Form.Slider;
  Switch: Form.Switch;
  Textarea: Form.Textarea;

  // navigator
  Navigator: Navigator.Navigator;

  // media
  AnimationView: Media.AnimationView;
  Audio: Media.Audio;
  Image: Media.Image;
  Video: Media.Video;
  LivePlayer: Media.LivePlayer;
  LivePusher: Media.LivePusher;

  // map
  Map: Map.Map;

  // canvas
  Canvas: Canvas.Canvas; // TODO

  // webView
  WebView: WebView.WebView;

  // ad
  Ad: Ad.Ad;
  AdRewardedVideo: Ad.AdRewardedVideo;
  AdFullscreenVideo: Ad.AdFullscreenVideo;
  AdInterstitial: Ad.AdInterstitial;
  AdDraw: Ad.AdDraw;
  AdContentPage: Ad.AdContentPage;
  AdInteractive: Ad.AdInteractive;

  // db
  UnicloudDb: Db.UnicloudDb;

  // page
  PageMeta: Page.PageMeta;
  NavigationBar: Page.NavigationBar;
  CustomTabBar: Page.CustomTabBar;

  // mini
  OfficialAccount: Mini.OfficialAccount;
  OpenData: Mini.OpenData;
}
