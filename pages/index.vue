<template>
  <Header />
  <div class="container-xl px-0">
      <section
        class="position-relative d-flex flex-column justify-content-end fixed-margin lazyLoad isLoaded"
      >
      
        <HeroStandardApollo
          :bg-image-source="bgImage"
          title="Earn a political science or global studies degree online"
          title-level="h1"
          title-size="large"
          title-variant="white"
          :gradient-opacity="0.7"
        >
        </HeroStandardApollo>
      </section>
    </div>

    <StickyNav />
    <SectionIntroFalcon
      id="section_overview"
      :title="`Become a global citizen`"
      :imageSource="sectionImg"
    >
      <template #body>
        <p>Arizona State University’s School of Politics and Global Studies offers degree programs designed to develop global citizens. Delivered through ASU Online, courses focus on how leaders use policy and research to solve the world’s most pressing problems in security and more. Learn how you can gain a global perspective and accomplish your goals from anywhere in the world.</p>
      </template>
    </SectionIntroFalcon>

    <CardTile />

    <SectionIntroFalcon
    id="section_accreditation"
    title="Are ASU Online programs accredited?"
    :imageSource="accImg"
  >
    <template #body>
      <p>
        Arizona State University is accredited by the
        <a
          target="_blank"
          class="non-rds-link text-underline"
        >
          Higher Learning Commission (HLC)
        </a>
        to deliver all online degree programs through ASU Online. For more information on accreditation, please visit the
        <a
          target="_blank"
          class="non-rds-link text-underline"
        >
          University Program Review and Accreditation Office
        </a>.
      </p>
      <p>
        <b>Note:</b> Students living and/or working outside of the U.S. must confirm with the relevant certifying agency if completing an online degree program at ASU meets the credentialing requirements of the country in which they seek employment.
      </p>
    </template>
  </SectionIntroFalcon>

  <div class="py-space-lg py-lg-space-xxl"
  :style="{ backgroundImage: `url(${testimonialBG})` }"
  >
    <!-- Section Title -->
    <div class="d-flex testimonial-title px-space-md pb-space-md">
      <h3
        class="text-center h3-large font-weight-bold text-white bg-dark-3 mb-0 px-space-xs py-space-xxs mx-auto"
      >
        What students are saying
      </h3>
    </div>

    <!-- Testimonial Component -->
    <ImageTestimonialAtlas
      :display-image="true"
      :image-source="testimonialImage"
      label="What students are saying"
      text="ASU Online has changed my opinion of how effective online education can be. I’ve received more tailor-made feedback and instruction during my time in the Master of Arts in global security than in any previous academic experience."
      author-text-size="large"
      author-text="Maddi King"
      designation-text="ASU Online student <br> Master of Arts in global security"
      designation-text-size="large"
    ></ImageTestimonialAtlas>
  </div>

  <DegreeCard />


  <FooterStandard
    class="mb-space-md mb-lg-0"
    @tertiaryMenuLinkClick="triggerHandleEvent"
  >
    <template #secondary-menu>
      <nav class="nav grid-flex-menu order-2 order-lg-1 mb-space-s mb-lg-0 px-space-l">
        <a
          v-for="(item, index) in sectionFooter.primaryItems"
          :key="index"
          :href="item.uri"
          :target="formatLinkTarget(item.target)"
          class="nav-link text-dark-3 menu-item fw-bold py-space-xxs py-lg-0"
          rel="noopener noreferrer"
          @click="triggerDlFooterSection(item.text)"
        >
          {{ item.text }}
        </a>
      </nav>
    </template>
  </FooterStandard>

  </template>

<script setup>
import bgImage from '@/assets/images/hero.png';
import sectionImg from '@/assets/images/section.png';
import accImg from '@/assets/images/acc.png';
import testimonialImage from '@/assets/images/testimonial.png';
import testimonialBG from '@/assets/images/testimonialBg.jpg';


const sectionFooter = ref({
  primaryItems: [
    {
      text: "Maps and Locations",
      
    },
    {
      text: "Jobs",
      
    },
    {
      text: "Directory",
     
    },
    {
      text: "Contact ASU",
  
    },
    {
      text: "My ASU",
    },
  ],
});
function formatLinkTarget(target) {
  return target || "_self"; 
}
</script>

<style lang="scss">
nav.grid-flex-menu {
  justify-items: start;
  flex-wrap: wrap;
  width: 100%;
}
</style>