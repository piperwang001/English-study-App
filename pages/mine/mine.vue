<template>
  <view class="mine-container">
    <!-- 用户信息区域 -->
    <view class="user-info">
      <image class="avatar" src="/static/logo.png"></image>
      <view class="user-details">
        <text class="username" @click="handleLogin">用户昵称</text>
        <text class="user-desc">这个人很懒，什么都没留下</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list">
      <view class="menu-item" @click="handleMenuClick('profile')">
        <text class="menu-icon">👤</text>
        <text class="menu-text">个人资料</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="handleMenuClick('settings')">
        <text class="menu-icon">⚙️</text>
        <text class="menu-text">设置</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="handleMenuClick('favorites')">
        <text class="menu-icon">❤️</text>
        <text class="menu-text">我的收藏</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="handleMenuClick('history')">
        <text class="menu-icon">📚</text>
        <text class="menu-text">学习记录</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="handleMenuClick('feedback')">
        <text class="menu-icon">💬</text>
        <text class="menu-text">意见反馈</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="handleMenuClick('about')">
        <text class="menu-icon">ℹ️</text>
        <text class="menu-text">关于我们</text>
        <text class="menu-arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 本地声明以通过类型检查（运行时由 uni-app 提供）
declare const uni: any;
import { post } from "../../utils/request";

async function handleLogin() {
  try {
    const res: any = await post("/api/user/login", {}, { showLoading: true });
    const token: string =
      (res && (res.token || (res.data && res.data.token))) || "";
    if (!token) {
      uni.showToast({ title: "登录失败：未返回token", icon: "none" });
      return;
    }
    uni.setStorageSync("token", token);
    uni.showToast({ title: "登录成功", icon: "success" });
  } catch (err) {
    uni.showToast({ title: "登录失败，请稍后重试", icon: "none" });
  }
}

function handleMenuClick(type: string) {
  uni.showToast({ title: `点击了${type}`, icon: "none" });
}
</script>

<style>
.mine-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.user-info {
  background-color: #ffffff;
  padding: 40rpx 30rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 30rpx;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.user-desc {
  font-size: 28rpx;
  color: #999;
}

.menu-list {
  background-color: #ffffff;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.menu-text {
  flex: 1;
  font-size: 32rpx;
  color: #333;
}

.menu-arrow {
  font-size: 32rpx;
  color: #ccc;
}
</style>
