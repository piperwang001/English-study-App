"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      title: "欢迎来到学习平台"
    };
  },
  onLoad() {
  },
  methods: {
    handleFeatureClick(feature) {
      common_vendor.index.showToast({
        title: `点击了${feature}`,
        icon: "none"
      });
    },
    goDictationUnits() {
      common_vendor.index.navigateTo({ url: "/pages/dictation/units" });
    },
    handleRecommendClick(item) {
      common_vendor.index.showToast({
        title: `查看${item}`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.t($data.title),
    c: common_vendor.o(($event) => $options.handleFeatureClick("course")),
    d: common_vendor.o(($event) => $options.handleFeatureClick("practice")),
    e: common_vendor.o(($event) => $options.handleFeatureClick("community")),
    f: common_vendor.o((...args) => $options.goDictationUnits && $options.goDictationUnits(...args)),
    g: common_vendor.o(($event) => $options.handleRecommendClick("vue")),
    h: common_vendor.o(($event) => $options.handleRecommendClick("uni"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
