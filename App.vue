<script setup lang="ts">
// 本地声明以通过类型检查（运行时由 uni-app 提供）
declare function onShow(hook: () => void): void;
declare function onHide(hook: () => void): void;

console.log("App Launch---");

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});
</script>

<style>
/*每个页面公共css */
</style>
