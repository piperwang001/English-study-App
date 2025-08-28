<template>
  <view class="play-container">
    <view class="header">
      <text class="timer">时间：{{ elapsed }}s</text>
      <view class="progress">
        <view class="progress-bar">
          <view
            class="progress-fill"
            :style="{ width: progressPct + '%' }"
          ></view>
        </view>
        <text class="progress-text">{{ matchedPairs }}/{{ totalPairs }}</text>
      </view>
    </view>

    <view class="grid">
      <view
        v-for="item in displayItems"
        :key="item.id"
        class="card"
        :class="[
          item.type === 'word' ? 'word' : 'meaning',
          item.hidden ? 'hidden' : '',
          selectedIds.includes(item.id) ? 'selected' : '',
          shakeIds.includes(item.id) ? 'shake' : '',
        ]"
        @click="onSelect(item)"
      >
        <text class="card-text">{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 本地声明以通过类型检查
declare const uni: any;
import { ref, computed, onMounted, onUnmounted } from "vue";

interface PairItem {
  id: string;
  pairId: string;
  type: "word" | "meaning";
  text: string;
  hidden?: boolean;
}

// 尝试从 storage 获取公共页面选择的词汇
const selectedWords: string[] = uni.getStorageSync("LINKING_WORDS") || [];

// 兜底词库（若没有选择，则使用）
const baseWords = [
  ["abandon", "to leave completely"],
  ["benefit", "an advantage gained"],
  ["create", "to make something"],
  ["define", "to explain the meaning"],
  ["eager", "very excited"],
  ["fancy", "to like or want"],
  ["gain", "to get something positive"],
  ["habit", "a repeated behavior"],
  ["ideal", "perfect or most suitable"],
  ["judge", "to form an opinion"],
];

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((v) => [Math.random(), v] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => v);
}

function buildPairsFromWords(
  words: string[]
): { id: string; word: string; meaning: string }[] {
  // 随机给出简单释义（演示），实际可调用词典接口
  return words.map((w, idx) => ({
    id: `p${idx}`,
    word: w,
    meaning: `meaning of ${w}`,
  }));
}

const pairs =
  selectedWords.length > 1
    ? buildPairsFromWords(selectedWords)
    : shuffle(baseWords)
        .slice(0, 5)
        .map(([w, m], idx) => ({ id: `p${idx}`, word: w, meaning: m }));

const initial: PairItem[] = pairs.reduce((acc: PairItem[], p) => {
  acc.push({ id: `${p.id}-w`, pairId: p.id, type: "word", text: p.word });
  acc.push({ id: `${p.id}-m`, pairId: p.id, type: "meaning", text: p.meaning });
  return acc;
}, []);

const items = ref<PairItem[]>(shuffle(initial));

const selectedIds = ref<string[]>([]);
const shakeIds = ref<string[]>([]);

const matchedPairs = computed(
  () => pairs.length - items.value.filter((i: PairItem) => !i.hidden).length / 2
);
const totalPairs = pairs.length;
const progressPct = computed(() =>
  Math.round((matchedPairs.value / totalPairs) * 100)
);

// 计时器
const elapsed = ref(0);
let timer: any = null;

onMounted(() => {
  timer = setInterval(() => {
    elapsed.value += 1;
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function onSelect(item: PairItem) {
  if (item.hidden) return;
  if (selectedIds.value.includes(item.id)) return;
  selectedIds.value.push(item.id);

  if (selectedIds.value.length === 2) {
    const [aId, bId] = selectedIds.value;
    const a = items.value.find((i: PairItem) => i.id === aId)!;
    const b = items.value.find((i: PairItem) => i.id === bId)!;

    if (a.pairId === b.pairId && a.type !== b.type) {
      items.value = items.value.map((i: PairItem) =>
        i.id === a.id || i.id === b.id ? { ...i, hidden: true } : i
      );
      selectedIds.value = [];

      if (items.value.every((i: PairItem) => i.hidden)) {
        uni.showToast({
          title: `完成！用时 ${elapsed.value}s`,
          icon: "success",
        });
      }
    } else {
      shakeIds.value = [a.id, b.id];
      setTimeout(() => {
        shakeIds.value = [];
      }, 300);
      selectedIds.value = [];
    }
  }
}

const displayItems = computed(() => items.value);
</script>

<style>
.play-container {
  padding: 24rpx;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.timer {
  font-size: 28rpx;
}

.progress {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.progress-bar {
  width: 300rpx;
  height: 16rpx;
  background-color: #f0f0f0;
  border-radius: 8rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007aff;
}

.progress-text {
  font-size: 24rpx;
  color: #666;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12rpx;
}

.card {
  width: 48%;
  margin: 1%;
  padding: 28rpx;
  border-radius: 16rpx;
  box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.06);
  min-height: 96rpx;
}

.card.word {
  background-color: #eaf5ff;
}

.card.meaning {
  background-color: #fff1e6;
}

.card.selected {
  border: 4rpx solid #007aff;
}

.card.hidden {
  opacity: 0;
}

.card-text {
  font-size: 28rpx;
  color: #333;
}

/* 失败晃动动画 */
@keyframes slight-shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6rpx);
  }
  50% {
    transform: translateX(6rpx);
  }
  75% {
    transform: translateX(-4rpx);
  }
  100% {
    transform: translateX(0);
  }
}

.card.shake {
  animation: slight-shake 0.3s linear;
}
</style>
