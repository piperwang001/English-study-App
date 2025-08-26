<template>
  <view class="study-container">
    <view class="study-stats">
      <view class="stat-item">
        <text class="stat-number">12</text>
        <text class="stat-label">今日学习时长(小时)</text>
      </view>
      <view class="stat-item">
        <text class="stat-number">156</text>
        <text class="stat-label">累计学习天数</text>
      </view>
      <view class="stat-item">
        <text class="stat-number">89</text>
        <text class="stat-label">完成课程数</text>
      </view>
    </view>

    <view class="progress-section">
      <text class="section-title">学习进度</text>
      <view class="progress-item">
        <view class="progress-info">
          <text class="course-name">前端开发基础</text>
          <text class="progress-text">已完成 75%</text>
        </view>
        <view class="progress-bar">
          <view class="progress-fill" style="width: 75%"></view>
        </view>
      </view>
    </view>

    <view class="recommend-section">
      <text class="section-title">推荐课程</text>
      <view class="course-item" @click="handleCourseClick('react')">
        <image class="course-image" src="/static/logo.png"></image>
        <view class="course-info">
          <text class="course-title">React.js入门</text>
          <text class="course-desc">从零开始学习React框架</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 本地声明以通过类型检查（运行时由 uni-app 提供）
declare const uni: any;

function handleCourseClick(course: string) {
  uni.showToast({ title: `开始学习${course}`, icon: "none" });
}
</script>

<style>
.study-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20rpx;
}

.study-stats {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30rpx;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #007aff;
  margin-bottom: 10rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

.progress-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  display: block;
}

.progress-item {
  margin-bottom: 30rpx;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
}

.course-name {
  font-size: 28rpx;
  color: #333;
}

.progress-text {
  font-size: 24rpx;
  color: #007aff;
}

.progress-bar {
  height: 10rpx;
  background-color: #f0f0f0;
  border-radius: 5rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007aff;
  border-radius: 5rpx;
}

.recommend-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
}

.course-item {
  display: flex;
  padding: 20rpx 0;
}

.course-image {
  width: 120rpx;
  height: 80rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.course-info {
  flex: 1;
}

.course-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.course-desc {
  font-size: 24rpx;
  color: #666;
}
</style>
