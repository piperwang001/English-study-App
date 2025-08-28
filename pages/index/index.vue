<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <!-- 功能区域 -->
    <view class="feature-section">
      <view class="feature-item" @click="handleFeatureClick('course')">
        <text class="feature-icon">📚</text>
        <text class="feature-text">课程中心</text>
      </view>
      <view class="feature-item" @click="handleFeatureClick('practice')">
        <text class="feature-icon">💻</text>
        <text class="feature-text">在线练习</text>
      </view>
      <view class="feature-item" @click="handleFeatureClick('community')">
        <text class="feature-icon">👥</text>
        <text class="feature-text">学习社区</text>
      </view>
      <view class="feature-item" @click="goDictationUnits">
        <text class="feature-icon">🔤</text>
        <text class="feature-text">词语听写</text>
      </view>
      <view class="feature-item" @click="goLinkingUnits">
        <text class="feature-icon">🔗</text>
        <text class="feature-text">词语连连看</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 本地声明以通过类型检查（运行时由 uni-app 提供）
declare const uni: any;

const title = "欢迎来到学习平台";

function handleFeatureClick(feature: string) {
  uni.showToast({ title: `点击了${feature}`, icon: "none" });
}

function goDictationUnits() {
  uni.navigateTo({ url: "/pages/dictation/units" });
}

function goLinkingUnits() {
  uni.navigateTo({ url: "/pages/common/units?mode=linking" });
}

function handleRecommendClick(item: string) {
  uni.showToast({ title: `查看${item}`, icon: "none" });
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.feature-section {
  display: flex;
  justify-content: space-around;
  margin: 60rpx 40rpx;
}

.feature-item {
  text-align: center;
  padding: 30rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  flex: 1;
  margin: 0 10rpx;
}

.feature-icon {
  font-size: 60rpx;
  display: block;
  margin-bottom: 20rpx;
}

.feature-text {
  font-size: 28rpx;
  color: #333;
}

.recommend-section {
  margin: 40rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  display: block;
}

.recommend-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.recommend-item:last-child {
  border-bottom: none;
}

.recommend-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.recommend-desc {
  font-size: 24rpx;
  color: #666;
}
</style>
