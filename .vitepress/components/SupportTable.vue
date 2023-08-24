<template>
  <table class="table">
    <thead>
      <tr>
        <th>平台</th>
        <th>APP</th>
        <th>H5</th>
        <th>微信</th>
        <th>支付宝</th>
        <th>百度</th>
        <th>抖音</th>
        <th>飞书</th>
        <!-- <th>QQ</th>
        <th>快手</th>
        <th>京东</th> -->
        <th>NVUE</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>支持性</td>
        <td>{{ dd('APP') }}</td>
        <td>{{ dd('H5') }}</td>
        <td>{{ dd('WEIXIN') }}</td>
        <td>{{ dd('ALIPAY') }}</td>
        <td>{{ dd('BAIDU') }}</td>
        <td>{{ dd('TOUTIAO') }}</td>
        <td>{{ dd('LARK') }}</td>
        <!-- <td>{{ dd('QQ') }}</td>
        <td>{{ dd('KUAISHOU') }}</td>
        <td>{{ dd('JD') }}</td> -->
        <td>{{ dd('NVUE') }}</td>
      </tr>
    </tbody>
    <div class="example">
      <span>⚪:未测试</span>
      <span>✅:支持</span>
      <span>❌:不支持/有部分功能不支持</span>
    </div>
  </table>

  <div class="info ">
    <div
      v-if="typeof props.APP === 'string'"
      class="warning custom-block"
    >
      APP：{{ ddd('APP') }}
    </div>
    <div
      v-if="typeof props.H5 === 'string'"
      class="warning custom-block"
    >
      H5：{{ ddd('H5') }}
    </div>
    <div
      v-if="typeof props.WEIXIN === 'string'"
      class="warning custom-block"
    >
      微信：{{ ddd('WEIXIN') }}
    </div>
    <div
      v-if="typeof props.ALIPAY === 'string'"
      class="warning custom-block"
    >
      支付宝：{{ ddd('ALIPAY') }}
    </div>
    <div
      v-if="typeof props.BAIDU === 'string'"
      class="warning custom-block"
    >
      百度：{{ ddd('BAIDU') }}
    </div>
    <div
      v-if="typeof props.TOUTIAO === 'string'"
      class="warning custom-block"
    >
      头条：{{ ddd('TOUTIAO') }}
    </div>
    <div
      v-if="typeof props.LARK === 'string'"
      class="warning custom-block"
    >
      飞书：{{ ddd('LARK') }}
    </div>
    <div
      v-if="typeof props.QQ === 'string'"
      class="warning custom-block"
    >
      QQ：{{ ddd('QQ') }}
    </div>
    <div
      v-if="typeof props.KUAISHOU === 'string'"
      class="warning custom-block"
    >
      快手：{{ ddd('KUAISHOU') }}
    </div>
    <div
      v-if="typeof props.JD === 'string'"
      class="warning custom-block"
    >
      京东：{{ ddd('JD') }}
    </div>
    <div
      v-if="typeof props.NVUE === 'string'"
      class="warning custom-block"
    >
      NVUE：{{ ddd('NVUE') }}
    </div>
  </div>
</template>

<script setup lang="ts">
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
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  APP: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  H5: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  WEIXIN: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  ALIPAY: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  BAIDU: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  TOUTIAO: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  LARK: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  QQ: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  KUAISHOU: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  JD: [Boolean, String],
  // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
  NVUE: [Boolean, String],
});

type PlatForm = keyof typeof props;

const dd = (platForm: PlatForm) => {
  const state = props[platForm];
  if (state === false) {
    return '⚪';
  }
  if (state === true) {
    return '✅';
  }
  return '❌';
};

const ddd = (platForm: PlatForm) => props[platForm];
</script>

<style  scoped>
.table {
  text-align: center;
}

.info .custom-block {
  padding-top: 8px;
}

.table:hover .example {
  opacity: 0.8;
}

.example {
  transition: .5s;
  overflow: hidden;
  padding-top: 5px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0;
}
</style>
