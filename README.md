# customer-scroll
---
## 简介
使用原生JavaScript实现的自定义滚动条。

![image](./sample.png)

## 功能
- 鼠标拖动滑块滚动
- 鼠标滚轮滚动
- 内容区长度变化，滚动条相应变化

## 待做
- 点击滚动条空白位置，滚动页面
- 自定义多种样式

## 使用
```
<div class="scroll-container">
  <div class="content">
    <!-- 内容区 -->
    ...
  </div>

  <!-- 滚动条 -->
  <div class="scroll">
    <div class="scroll-box"></div>
  </div>
</div>
```