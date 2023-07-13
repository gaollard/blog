---
title: 04 use yoga
tags: Android
---

Yoga 布局引擎实际上是一个数值计算引擎，它实际上是与 UI 视图无关的。

在 Yoga 中，布局的每个元素都是一个节点(YogaNode)，这个 YogaNode 会代表界面上的某个元素（比如一个 TextView），但是两者没有直接关联。

- https://cloud.tencent.com/developer/article/1006148?from=15425&areaSource=102001.2&traceId=dMKXhKr6CYMolCNoQIPPY
- https://maxiee.github.io/post/ReactNativeCode12md/

```java
  FrameLayout container = new FrameLayout(this);

  /**
   * 布局纯数值计算
   */
  float screenWidth = getWindowManager().getDefaultDisplay().getWidth();
  float screenHeight = getWindowManager().getDefaultDisplay().getHeight() - 56 - 24;

  YogaNode root = new YogaNodeJNIFinalizer();
  root.setWidth(screenWidth);
  root.setHeight(screenHeight);
  root.setFlexDirection(YogaFlexDirection.ROW);

  YogaNode rect1 = new YogaNodeJNIFinalizer();
    rect1.setFlex(1);

  YogaNode rect2 = new YogaNodeJNIFinalizer();
    rect2.setFlex(2);

  YogaNode rect3 = new YogaNodeJNIFinalizer();
    rect3.setFlex(1);

  root.addChildAt(rect1, 0);
  root.addChildAt(rect2, 1);
  root.addChildAt(rect3, 2);

  // 给定屏幕长宽，求解屏幕元素位置
  root.calculateLayout(screenWidth, screenHeight);

  View v1 = new View(this);
  v1.setBackgroundColor(Color.parseColor("#d50000"));
  rect1.setData(v1);

  View v2 = new View(this);
  v2.setBackgroundColor(Color.parseColor("#ff1744"));
  rect2.setData(v2);

  View v3 = new View(this);
  v3.setBackgroundColor(Color.parseColor("#ff5252"));
  rect3.setData(v3);

  container.addView(v1);
  container.addView(v2);
  container.addView(v3);

  v1.setX(rect1.getLayoutX());
  v1.setY(rect1.getLayoutY());
  v1.setLayoutParams(new FrameLayout.LayoutParams((int)(rect1.getLayoutWidth()), (int)(rect1.getLayoutHeight())));

  v2.setX(rect2.getLayoutX());
  v2.setY(rect2.getLayoutY());
  v2.setLayoutParams(new FrameLayout.LayoutParams((int)(rect2.getLayoutWidth()), (int)(rect2.getLayoutHeight())));

  v3.setX(rect3.getLayoutX());
  v3.setY(rect3.getLayoutY());
  v3.setLayoutParams(new FrameLayout.LayoutParams((int)(rect3.getLayoutWidth()), (int)(rect3.getLayoutHeight())));

  setContentView(container);
```