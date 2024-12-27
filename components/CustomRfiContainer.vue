<template>
  <main>
    <section
    id="section_rfi"
  :style="{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }"
      >
      <div class="container p-0">
        <div class="row py-lg-space-xxl py-md-space-lg m-0">
          <div class="col-12 col-lg-5 p-0">
            <img
              src="@/assets/images/rfi-card-image.jpg"
              class="d-none d-lg-block h-100 w-100"
              alt="asu online image"
            />
            <img
            src="@/assets/images/rfi-degree-mobile.jpg"
            alt="asu online image"
              class="d-block d-lg-none w-100"
            />
          </div>
          <div
            class="col-12 col-lg-7 bg-white py-space-md px-space-xs py-md-space-lg px-md-space-sm py-lg-space-xl px-lg-space-xxl"
          >
            <slot name="title"></slot>
            <slot name="text"></slot>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </section>
  </main>

</template>
<script setup>
import bgImage from '@/assets/images/rfi-bg-overlay.png';
</script>
<style lang="scss" scoped>

</style>
