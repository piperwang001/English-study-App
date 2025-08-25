"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      words: [],
      currentIndex: 0,
      answer: "",
      showResult: false,
      lastCorrect: false,
      startTs: 0,
      timerId: null,
      elapsedMs: 0
    };
  },
  computed: {
    total() {
      return this.words.length;
    },
    currentWord() {
      return this.words[this.currentIndex] || "";
    },
    progressPercent() {
      return this.total ? Math.floor(this.currentIndex / this.total * 100) : 0;
    },
    elapsedDisplay() {
      const s = Math.floor(this.elapsedMs / 1e3);
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      return `${mm}:${ss}`;
    }
  },
  onLoad() {
    const list = common_vendor.index.getStorageSync("DICTATION_WORDS") || [];
    this.words = Array.isArray(list) && list.length ? list : ["apple", "banana", "orange"];
    this.startTimer();
  },
  onUnload() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.startTs = Date.now();
      this.timerId = setInterval(() => {
        this.elapsedMs = Date.now() - this.startTs;
      }, 250);
    },
    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
    playAudio() {
      common_vendor.index.showToast({ title: `播放：${this.currentWord}`, icon: "none" });
    },
    submit() {
      if (!this.currentWord)
        return;
      const normalizedAnswer = String(this.answer || "").trim().toLowerCase();
      const normalizedTarget = String(this.currentWord).trim().toLowerCase();
      const correct = normalizedAnswer === normalizedTarget;
      this.lastCorrect = correct;
      this.showResult = true;
      if (correct) {
        setTimeout(() => {
          this.answer = "";
          this.showResult = false;
          if (this.currentIndex < this.total - 1) {
            this.currentIndex += 1;
          } else {
            this.finish();
          }
        }, 400);
      }
    },
    finish() {
      this.stopTimer();
      common_vendor.index.showModal({
        title: "完成",
        content: `共 ${this.total} 个单词，用时 ${this.elapsedDisplay}`,
        showCancel: false,
        success: () => {
          common_vendor.index.navigateBack();
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.elapsedDisplay),
    b: common_vendor.t($data.currentIndex + 1),
    c: common_vendor.t($options.total),
    d: common_vendor.o((...args) => $options.playAudio && $options.playAudio(...args)),
    e: $data.answer,
    f: common_vendor.o(($event) => $data.answer = $event.detail.value),
    g: $options.progressPercent + "%",
    h: $data.showResult
  }, $data.showResult ? {
    i: common_vendor.t($data.lastCorrect ? "正确！" : "错误，正确答案：" + $options.currentWord),
    j: $data.lastCorrect ? 1 : "",
    k: !$data.lastCorrect ? 1 : ""
  } : {}, {
    l: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dictation/play.js.map
