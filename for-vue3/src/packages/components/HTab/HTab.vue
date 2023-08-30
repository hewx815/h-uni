<script  lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

enum DD {
  'A',
  'AA',
  'AAA',
}

export default defineComponent({
  props: {
    book: {
      // 提供相对 `Object` 更确定的类型
      type: Object as PropType<DD>,
      required: true,
    },
    bookName: {
      type: String,
      default: '1',
    },
    bookNames: {
      type: String as PropType<string>,
      default: '11',
    },
  },
});

</script>

<style lang='scss' scoped></style>
