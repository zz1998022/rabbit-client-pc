<script>
import { h } from "vue";

export default {
  name: "XtxBread",
  render() {
    // 插槽内容，就是具体每一个面包屑选项
    const items = this.$slots.default();
    const result = [];
    // 遍历具体的面包屑选项 在恰当的时候加 >
    items.forEach((item, index) => {
      result.push(item);
      // 判断是否是最后一项
      if (index < items.length - 1) {
        // 不是最后一项 加 >
        result.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "xtx-bread" }, result);
  },
};
</script>

<style lang="less" scoped>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
