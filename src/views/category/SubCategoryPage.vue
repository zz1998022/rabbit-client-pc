<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.topCategory?.id}`">{{
          category.topCategory?.name
        }}</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.subCategory?.id">
            {{ category.subCategory?.name }}
          </XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 筛选条件组件 -->
      <SubFilter @onFilterChanged="onFilterChanged" />
      <XtxCheckbox v-model="isCheckedData">仅显示有货商品</XtxCheckbox>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import SubFilter from "@/views/category/components/SubFilter";
export default {
  name: "SubCategoryPage",
  components: { SubFilter, AppLayout },
  setup() {
    // 获取面包屑导航需要的分类数据
    const category = useBread();
    const onFilterChanged = (data) => {
      console.log(data);
    };
    const isCheckedData = ref(false);
    return { category, onFilterChanged, isCheckedData };
  },
};

function useBread() {
  // 获取 store 对象
  const store = useStore();
  // 获取 route 对象
  const route = useRoute();
  // 根据二级分类 id 查找二级分类和一级分类
  return computed(() => {
    // 用于存储一级分类和二级分类的对象
    const result = {};
    // 遍历一级分类
    store.state.category.list.forEach((topCategory) => {
      // 遍历二级分类
      topCategory.children?.forEach((subCategory) => {
        // 查找当前二级分类
        if (subCategory.id === route.params.id) {
          // 存储一级分类
          result.topCategory = {
            name: topCategory.name,
            id: topCategory.id,
          };
          // 存储二级分类
          result.subCategory = {
            name: subCategory.name,
            id: subCategory.id,
          };
        }
      });
    });
    // 返回结果
    return result;
  });
}
</script>

<style scoped></style>
