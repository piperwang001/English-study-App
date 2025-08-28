<template>
  <view class="units-container">
    <view class="header">
      <text class="title">{{ pageTitle }}</text>
    </view>

    <view class="units-list">
      <view class="unit-card" v-for="unit in units" :key="unit.id">
        <view class="unit-header">
          <text class="unit-name">{{ unit.name }}</text>
          <view class="unit-actions">
            <button size="mini" @click="toggleSelectUnit(unit)">
              {{ isUnitAllSelected(unit) ? "取消全选" : "全选本单元" }}
            </button>
          </view>
        </view>

        <checkbox-group @change="onCheckboxChange(unit, $event)">
          <view class="word-item" v-for="w in unit.words" :key="w">
            <label class="word-label">
              <checkbox :value="w" :checked="isChecked(unit, w)" />
              <text class="word-text">{{ w }}</text>
            </label>
          </view>
        </checkbox-group>
      </view>
    </view>

    <view class="bottom-bar">
      <text class="selected-count">已选 {{ totalSelected }} 个单词</text>
      <button type="primary" :disabled="totalSelected === 0" @click="confirm">
        {{ confirmText }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mode: "dictation", // dictation | linking
      units: [
        {
          id: "u1",
          name: "Unit 1",
          words: ["apple", "banana", "orange", "grape"],
        },
        {
          id: "u2",
          name: "Unit 2",
          words: ["table", "chair", "window", "door"],
        },
        { id: "u3", name: "Unit 3", words: ["red", "blue", "green", "yellow"] },
      ],
      selectedMap: {},
    };
  },
  computed: {
    pageTitle() {
      return this.mode === "linking" ? "选择连连看词语" : "选择单元单词";
    },
    confirmText() {
      return this.mode === "linking" ? "进入连连看" : "开始听写";
    },
    totalSelected() {
      return Object.values(this.selectedMap).reduce(
        (sum, arr) => sum + arr.length,
        0
      );
    },
  },
  onLoad(query) {
    if (query && query.mode) {
      this.mode = query.mode;
    }
  },
  methods: {
    ensureUnitKey(unitId) {
      if (!this.selectedMap[unitId]) this.$set(this.selectedMap, unitId, []);
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
    confirm() {
      const words = Object.values(this.selectedMap).reduce(
        (acc, arr) => acc.concat(arr),
        []
      );
      if (!words.length) {
        uni.showToast({ title: "请先选择单词", icon: "none" });
        return;
      }
      if (this.mode === "linking") {
        uni.setStorageSync("LINKING_WORDS", words);
        uni.navigateTo({ url: "/pages/linking/play" });
      } else {
        uni.setStorageSync("DICTATION_WORDS", words);
        uni.navigateTo({ url: "/pages/dictation/play" });
      }
    },
  },
};
</script>

<style>
.units-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 140rpx;
}
.header {
  padding: 30rpx 30rpx 0 30rpx;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
.units-list {
  padding: 20rpx 20rpx 140rpx 20rpx;
}
.unit-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.unit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}
.unit-name {
  font-size: 30rpx;
  color: #333;
}
.word-item {
  padding: 14rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.word-item:last-child {
  border-bottom: none;
}
.word-label {
  display: flex;
  align-items: center;
}
.word-text {
  margin-left: 16rpx;
  font-size: 28rpx;
  color: #333;
}
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx;
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.06);
}
.selected-count {
  color: #666;
  font-size: 26rpx;
}
</style>
