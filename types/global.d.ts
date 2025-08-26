/// <reference types="@dcloudio/types" />

// 全局 uni 与生命周期（无需外部依赖）
declare const uni: any;

declare function onShow(hook: () => void): void;
declare function onHide(hook: () => void): void;
