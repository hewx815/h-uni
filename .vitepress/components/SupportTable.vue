<template>
  <table class="table">
    <thead>
      <tr>
        <th>平台</th>
        <th
          v-for="(value, key) in platForms"
          :key="key"
        >
          {{ value }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>支持性</td>
        <td
          v-for="(value, key) in platForms"
          :key="key"
        >
          {{ getSign(key) }}
        </td>
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
      v-for="(value, key) in platForms"
      :key="key"
    >
      <div
        v-if="typeof props[key] === 'string'"
        class="warning custom-block"
      >
        {{ value }}：{{ props[key] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const platForms = {
  H5: 'H5',
  WEIXIN: '微信',
  ALIPAY: '支付宝',
  BAIDU: '百度',
  TOUTIAO: '抖音',
  LARK: '飞书',
  // QQ: 'QQ',
  // KUAISHOU: '快手',
  // JD: '京东',
  APP: 'APP',
};
export default {
  data() {
    return {
      platForms,
    };
  },
};
</script>

<script setup lang="ts">
/**
 * @description 兼容性展示表格
 * @property {Boolean||String} APP
 *    @value {Boolean} true 支持
 *    @value {Boolean} false 未知、不支持
 *    @value {String} 不完全支持,底部会显示此描述
*/

// eslint-disable-next-line vue/valid-define-props
const props = defineProps(Object.fromEntries(
  Object.keys(platForms).map((key) => [key, [Boolean, String]]),
));

const getSign = (platForm: keyof typeof props) => {
  const state = props[platForm];
  if (state === false) {
    return '⚪';
  }

  if (state === true) {
    return '✅';
  }

  return '❌';
};

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
  width: 300px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0;
}
</style>
