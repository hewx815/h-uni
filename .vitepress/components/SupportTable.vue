<template>
  <table class="table">

    <tr>
      <td>平台</td>
      <td>APP</td>
      <td>H5</td>
      <td>微信</td>
      <td>支付宝</td>
      <td>百度</td>
      <td>头条</td>
      <td>QQ</td>
      <td>快手</td>
      <td>京东</td>
    </tr>

    <tr>
      <td>支持性</td>
      <td>{{ dd('APP') }}</td>
      <td>{{ dd('H5') }}</td>
      <td>{{ dd('WEIXIN') }}</td>
      <td>{{ dd('ALIPAY') }}</td>
      <td>{{ dd('BAIDU') }}</td>
      <td>{{ dd('TOUTIAO') }}</td>
      <td>{{ dd('QQ') }}</td>
      <td>{{ dd('KUAISHOU') }}</td>
      <td>{{ dd('JD') }}</td>
    </tr>
  </table>

  <div class="info ">
    <div
      class="warning custom-block"
      v-if="typeof props.APP === 'string'"
    >APP：{{ ddd('APP') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.H5 === 'string'"
    >H5：{{ ddd('H5') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.WEIXIN === 'string'"
    >微信：{{ ddd('WEIXIN') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.ALIPAY === 'string'"
    >支付宝：{{ ddd('ALIPAY') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.BAIDU === 'string'"
    >百度：{{ ddd('BAIDU') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.TOUTIAO === 'string'"
    >头条：{{ ddd('TOUTIAO') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.QQ === 'string'"
    >QQ：{{ ddd('QQ') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.KUAISHOU === 'string'"
    >快手：{{ ddd('KUAISHOU') }}</div>
    <div
      class="warning custom-block"
      v-if="typeof props.JD === 'string'"
    >京东：{{ ddd('JD') }}</div>
  </div>
</template>

<script setup>
/**
 * @description 兼容性展示表格
 * @property {Boolean||String} APP
 *    @value {Boolean} true 支持
 *    @value {Boolean} false 未知、不支持
 *    @value {String} 不完全支持,底部会显示此描述
 * @event
 * @slot
*/

const props = defineProps({
  APP: [Boolean, String],
  H5: [Boolean, String],
  WEIXIN: [Boolean, String],
  ALIPAY: [Boolean, String],
  BAIDU: [Boolean, String],
  TOUTIAO: [Boolean, String],
  QQ: [Boolean, String],
  KUAISHOU: [Boolean, String],
  JD: [Boolean, String],
});

const dd = (platForm) => {
  const state = props[platForm]
  if (state === false) {
    return '⚪'
  }
  if (state === true) {
    return '✅'
  }
  return '❌'
}

const ddd = (platForm) => {
  return props[platForm];
}
</script>

<style  scoped>
.table {
  text-align: center;
}

.info .custom-block {
  padding-top: 8px;
}
</style>
