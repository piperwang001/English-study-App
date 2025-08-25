"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      units: [
        {
          id: "u1",
          name: "Unit 1",
          words: ["apple", "banana", "orange", "grape"]
        },
        {
          id: "u2",
          name: "Unit 2",
          words: ["table", "chair", "window", "door"]
        },
        { id: "u3", name: "Unit 3", words: ["red", "blue", "green", "yellow"] }
      ],
      selectedMap: {}
    };
  },
  computed: {
    totalSelected() {
      return Object.values(this.selectedMap).reduce(
        (sum, arr) => sum + arr.length,
        0
      );
    }
  },
  methods: {
    ensureUnitKey(unitId) {
      if (!this.selectedMap[unitId])
        this.$set(this.selectedMap, unitId, []);
    },
    isChecked(unit, word) {
      const list = this.selectedMap[unit.id] || [];
      return list.includes(word);
    },
    isUnitAllSelected(unit) {
      const list = this.selectedMap[unit.id] || [];
      return list.length === unit.words.length;
    },
    toggleSelectUnit(unit) {
      this.ensureUnitKey(unit.id);
      if (this.isUnitAllSelected(unit)) {
        this.selectedMap[unit.id] = [];
      } else {
        this.selectedMap[unit.id] = [...unit.words];
      }
      this.selectedMap = { ...this.selectedMap };
    },
    onCheckboxChange(unit, e) {
      this.selectedMap[unit.id] = e.detail.value;
      this.selectedMap = { ...this.selectedMap };
    },
    startDictation() {
      const words = Object.entries(this.selectedMap).flatMap(
        ([unitId, arr]) => arr
      );
      if (!words.length) {
        common_vendor.index.showToast({ title: "请先选择单词", icon: "none" });
        return;
      }
      common_vendor.index.setStorageSync("DICTATION_WORDS", words);
      common_vendor.index.navigateTo({ url: "/pages/dictation/play" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.units, (unit, k0, i0) => {
      return {
        a: common_vendor.t(unit.name),
        b: common_vendor.t($options.isUnitAllSelected(unit) ? "取消全选" : "全选本单元"),
        c: common_vendor.o(($event) => $options.toggleSelectUnit(unit), unit.id),
        d: common_vendor.f(unit.words, (w, k1, i1) => {
          return {
            a: w,
            b: $options.isChecked(unit, w),
            c: common_vendor.t(w),
            d: w
          };
        }),
        e: common_vendor.o(($event) => $options.onCheckboxChange(unit, $event), unit.id),
        f: unit.id
      };
    }),
    b: common_vendor.t($options.totalSelected),
    c: $options.totalSelected === 0,
    d: common_vendor.o((...args) => $options.startDictation && $options.startDictation(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dictation/units.js.map
