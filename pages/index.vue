<template>
  <Header />
  <div class="container-xl px-0">
      <section
        class="position-relative d-flex flex-column justify-content-end fixed-margin lazyLoad isLoaded"
        
      >
      
        <HeroStandardApollo
          class="px-space-xs"
          :bg-image-source="bgImage"
          title="Earn a political science or global studies degree online"
          title-level="h1"
          title-size="large"
          title-variant="white"
          
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

  <CustomRfiContainer
      bgImageSource="rfi-bg-overlay.png"
      desktopImage="rfi-card-image.jpg"
      mobileImage="rfi-degree-mobile.jpg"
    >
      <template #title>
        <div v-if="!success">
          <p class="text-small pb-space-xxs fw-bold m-0">
            Step 1 of 2
          </p>
          <h1 class="h1-small">Get started today</h1>
        </div>
      </template>
      <template #text>
        <p class="py-space-xs">
          To learn more about ASU Online or a specific program, fill out the
          form below and check your email for information on next steps.
        </p>
      </template>
      <template #body>
        
          <div>
            <p class="mb-space-sm">* Indicates a required field</p>
            <div class="py-0 mb-space-xs mb-lg-space-md">
              <div class="col-12 mb-space-xs mb-lg-space-md">
                <label for="degree_types" class="form-label fw-bold fs-medium"
                  >Degree options</label
                >
                <typeahead-select id="degree-type" v-model="modelValue" :options="options" />
              </div>
              <div class="col-12 mb-space-xs mb-lg-space-md">
    <label for="area_of_interest" class="form-label fw-bold fs-medium">
      Area of Interest
    </label>
    <typeahead-select id="degree-type" v-model="modelValue" :options="options" />

  </div>
              <div class="col-12 mb-space-xs mb-lg-space-md">
                <label for="program" class="form-label fw-bold fs-medium"
                  >* Program</label
                >
                <typeahead-select id="degree-type" v-model="modelValue" :options="options" />

              </div>
              <div class="col-12 mb-space-xs mb-lg-space-xl">
                <p class="form-label fw-bold fs-medium">
                  * Have you served in the U.S. military or are you a military
                  dependent?
                </p>
                <div class="d-flex">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="radio_yes_option"
                      value="true"
                      @click="triggerRadio('yes')"
                    />
                    <label class="form-check-label" for="radio_yes_option">
                      Yes
                    </label>
                  </div>
                  <div class="form-check ms-space-lg">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="radio_no_option"
                      value="false"
                      @click="triggerRadio('no')"
                      checked
                    />
                    <label class="form-check-label" for="radio_no_option">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div align="right">
              <button
                class="btn btn-secondary fs-large px-space-lg disabled"
                @click="triggerDlContinueClick('continue', 'step 1 of 2')"
              >
                Continue
              </button>
            </div>
          </div>
      </template>
    </CustomRfiContainer>
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

<script setup lang="ts">
import bgImage from '@/assets/images/hero.png';
import sectionImg from '@/assets/images/section.png';
import accImg from '@/assets/images/acc.png';
import testimonialImage from '@/assets/images/testimonial.png';
import testimonialBG from '@/assets/images/testimonialBg.jpg';

const modelValue = ref<OptionType | null>(null);
const options: OptionType[] = [
  { text: "Undergrad", value: "undergrad" },
  { text: "Undergrad ( Non-degree )", value: "undergrad-non-degree" },
  { text: "Grad", value: "grad" },
  { text: "Certificate", value: "certificate" },
];
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