"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    handleMenuClick(type) {
      common_vendor.index.showToast({
        title: `点击了${type}`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o(($event) => $options.handleMenuClick("profile")),
    c: common_vendor.o(($event) => $options.handleMenuClick("settings")),
    d: common_vendor.o(($event) => $options.handleMenuClick("favorites")),
    e: common_vendor.o(($event) => $options.handleMenuClick("history")),
    f: common_vendor.o(($event) => $options.handleMenuClick("feedback")),
    g: common_vendor.o(($event) => $options.handleMenuClick("about"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
