<template>
    <section id="section_degrees">
      <CarouselCardApollo
        :description="pageData.sectionExplorePrograms.text"
        :slides="programs"
        section-background-variant="white"
        :slidesPerPage="4"
        :title="pageData.sectionExplorePrograms.text"
        @indicatorClick="triggerDlCarousel('pagination', 'owl dot')"
        @previousSlideClick="triggerDlCarousel('carousel', 'left chevron')"
        @nextSlideClick="triggerDlCarousel('carousel', 'right chevron')"
      >
        <template v-slot="slotProps">
          <div
            class="col"
            v-for="program in slotProps.paginatedSlides"
            :key="program.slideKey"
          >
            <a @click="selectedProgramData(program)"
              ><CardDegreeSearch
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                :title="program.title"
                :image-source="program.degreeImage"
                image-alt="cardimg"
                class="h-100"
                :label="program.category"
                :footer-label="`Starts ${program.nextStartDate.replace(
                  /^([^-]+)[-]+([^-]+)[-]+([^-]+)(.*)/,
                  '$2/$3/$1'
                )}`"
                @ctaClick="selectedProgramData(program)"
                @iconClick="selectedProgramData(program)"
              ></CardDegreeSearch
            ></a>
          </div>
        </template>
      </CarouselCardApollo>

      <!-- side bar -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <button
            class="bg-white rounded-0 text-start border-0 py-space-xs fs-small back-btn"
            data-bs-dismiss="offcanvas"
            @click="triggerDlCloseSideBar(courseData.title)"
          >
            <img
              src="~/assets/images/arrow-left.png"
              class="me-space-xxs"
              alt="back-arrow"
              width="14px"
              height="14px"
            />
          </button>
        </div>
        <div class="offcanvas-body">
          <div>
            <div
              class="sidebar-image"
              :style="{
                backgroundImage: `url(${courseData.degreeImage})`,
              }"
            ></div>
            <div class="px-space-sm">
              <div class="py-space-md">
                <h2 class="h2-medium text-dark-3">{{ courseData.title }}</h2>
              </div>
              <hr class="m-0" />
              <div class="row pt-space-sm">
                <div class="col-12 col-lg-6">
                  <div class="d-flex">
                    <p class="fs-small">
                      <img
                        src="~/ assets/images/iconOk.svg"
                        alt="yellow solid check"
                        class="pe-space-xxs"
                      />{{ courseData.nextStartDate ? 'Next Start Date:' : '' }}
                    </p>
                    <p class="fs-small fw-bold ps-space-xxxs">
                      {{ courseData.nextStartDate }}
                    </p>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="d-flex">
                    <p class="fs-small">
                      <img
                        src="~/ assets/images/iconOk.svg"
                        alt="yellow solid check"
                        class="pe-space-xxs"
                      />{{ courseData.weeksPerClass ? 'Weeks per class:' : '' }}
                    </p>
                    <p class="fs-small fw-bold ps-space-xxxs">
                      {{ courseData.weeksPerClass }}
                    </p>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="d-flex">
                    <p class="fs-small">
                      <img
                        src="~/ assets/images/iconOk.svg"
                        alt="yellow solid check"
                        class="pe-space-xxs"
                      />{{ courseData.totalClasses ? 'Total classes:' : '' }}
                    </p>
                    <p class="fs-small fw-bold ps-space-xxxs">
                      {{ courseData.totalClasses }}
                    </p>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="d-flex">
                    <p class="fs-small">
                      <img
                        src="~/ assets/images/iconOk.svg"
                        alt="yellow solid check"
                        class="pe-space-xxs"
                      />{{
                        courseData.totalCreditHours ? 'Total credit hours:' : ''
                      }}
                    </p>
                    <p class="fs-small fw-bold ps-space-xxxs">
                      {{ courseData.totalCreditHours }}
                    </p>
                  </div>
                </div>
              </div>
              <hr class="m-0" />
              <div v-if="courseData.shortDescription" class="pt-space-lg">
                <h2 class="pb-space-xs h2-small">
                  {{ courseData.shortDescription ? 'Description' : '' }}
                </h2>
                <div
                  class="text-medium"
                  v-html="courseData.shortDescription"
                ></div>
              </div>
              <div class="pt-space-sm pb-space-xl">
                <h2 class="pb-space-md h2-small">
                  {{ courseData.featuredCourses ? 'Featured courses' : '' }}
                </h2>

                <div class="ps-0">
                  <div
                    v-for="(
                      item, index
                    ) in courseData.featuredCourses?.items.slice(0, limit_by)"
                    :key="index"
                  >
                    <div class="row align-items-center my-space-xxs">
                      <div
                        v-if="
                          (courseData.category == 'Undergraduate' &&
                            item.title.split(':')[0]) ||
                          (courseData.category != 'Undergraduate' &&
                            item.category)
                        "
                        class="col-6 col-lg-4"
                      >
                        <p
                          class="text-center bg-dark-3 text-white my-auto py-space-xxxs px-space-xxs fw-bold"
                          :class="
                            courseData.category == 'Graduate' &&
                            item.category == null
                              ? 'd-none'
                              : ''
                          "
                        >
                          {{
                            courseData.category == 'Undergraduate'
                              ? item.title.split(':')[0]
                              : item.category
                          }}
                        </p>
                      </div>
                      <div
                        :class="
                          (courseData.category == 'Undergraduate' &&
                            item.title.split(':')[0]) ||
                          (courseData.category != 'Undergraduate' &&
                            item.category)
                            ? 'col-6 col-lg-8'
                            : 'col-12'
                        "
                        class="fs-large fw-bold"
                      >
                        {{
                          courseData.category == 'Undergraduate'
                            ? item.title.split(':')[1].trim()
                            : item.title
                        }}
                      </div>
                      <div class="col-12"><hr class="w-100" /></div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="courseData.featuredCourses?.items.length > 4"
                  class="mt-space-md text-center"
                >
                  <a
                    class="text-dark fw-bold text-decoration-underline pointer-mouse"
                    @click="
                      showMore(
                        courseData.title,
                        default_limit,
                        courseData.featuredCourses?.items.length,
                        limit_by
                      )
                    "
                    >{{ limit_by === 4 ? 'Show more' : 'Show less' }}
                    <font-awesome-icon
                      class="ms-space-xxxs"
                      :icon="limit_by === 4 ? 'chevron-down' : 'chevron-up'"
                    >
                    </font-awesome-icon
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const programs = ref([]);
const pageData = ref({});
const courseData = ref({}); // To store selected program data dynamically

onMounted(async () => {
  pageData.value = await import('@/content/keystone.json').then((m) => m.default);
  programs.value = await import('@/content/allProgram.json').then((m) => m.default);
});
</script>