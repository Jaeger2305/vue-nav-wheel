<template functional>
  <!-- eslint-disable-next-line vue/no-parsing-error-->
  <defs xmlns="http://www.w3.org/2000/svg">
    <filter id="dropshadow" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
      <feOffset dx="2" dy="2" result="offsetblur" />
      <feMerge>
        <feMergeNode in="offsetblur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="linear-gradient" gradientTransform="rotate(65)">
      <stop class="linear-gradient-stop-1" offset="0%" />
      <stop class="linear-gradient-stop-2" offset="50%" />
      <stop class="linear-gradient-stop-3" offset="100%" />
    </linearGradient>
    <linearGradient
      id="linear-gradient--visited"
      gradientTransform="rotate(65)"
    >
      <stop class="linear-gradient-stop-1--visited" offset="0%" />
      <stop class="linear-gradient-stop-2--visited" offset="50%" />
      <stop class="linear-gradient-stop-3--visited" offset="100%" />
    </linearGradient>
    <linearGradient id="linear-gradient--active" gradientTransform="rotate(65)">
      <stop class="linear-gradient-stop-1--active" offset="0%" />
      <stop class="linear-gradient-stop-2--active" offset="50%" />
      <stop class="linear-gradient-stop-3--active" offset="100%" />
    </linearGradient>
    <linearGradient id="linear-gradient--hover" gradientTransform="rotate(65)">
      <stop class="linear-gradient-stop-1--hover" offset="0%" />
      <stop class="linear-gradient-stop-2--hover" offset="50%" />
      <stop class="linear-gradient-stop-3--hover" offset="100%" />
    </linearGradient>
  </defs>
</template>
