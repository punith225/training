<template>
    <section id="section_degrees">
      <CarouselCardApollo
        :description="pageData.sectionExplorePrograms.text"
        :slides="programs"
        section-background-variant="white"
        :slidesPerPage="4"
        :title="pageData.sectionExplorePrograms.title"
        @indicatorClick="triggerDlCarousel('pagination', 'owl dot')"
        @previousSlideClick="triggerDlCarousel('carousel', 'left chevron')"
        @nextSlideClick="triggerDlCarousel('carousel', 'right chevron')"
      >
        <template v-slot="slotProps">
          <div
            class="col"
            v-for="program in slotProps.paginatedSlides"
            :key="program.id"
          >
            <a @click="selectedProgramData(program)">
              <CardDegreeSearch
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                :title="program.title"
                :image-source="program.degreeImage"
                image-alt="cardimg"
                class="h-100"
                :label="program.category"
                :footer-label="`Starts ${formatDate(program.nextStartDate)}`"
                @ctaClick="selectedProgramData(program)"
                @iconClick="selectedProgramData(program)"
              ></CardDegreeSearch>
            </a>
          </div>
        </template>
      </CarouselCardApollo>
  
     <!-- Dynamic Content 
      <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">
          {{ selectedProgram.title || "Offcanvas right" }}
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          @click="triggerDlCloseSideBar(selectedProgram.title)"
        ></button>
      </div>
      
      <div class="offcanvas-body">
        <div>
          
          <div
            class="sidebar-image"
            :style="{ backgroundImage: `url(${selectedProgram.degreeImage})` }"
          ></div>
          <div class="px-space-sm">
            <h2 class="h2-medium text-dark-3">{{ selectedProgram.title }}</h2>
            <div class="row pt-space-sm">
              <div class="col-12 col-lg-6">
                <p class="fs-small">
                  <img
                    src="~/assets/images/iconOk.svg"
                    alt="yellow solid check"
                    class="pe-space-xxs"
                  />
                  Next Start Date:
                </p>
                <p class="fs-small fw-bold ps-space-xxxs">
                  {{ formatDate(selectedProgram.nextStartDate) }}
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <p class="fs-small">
                  <img
                    src="~/assets/images/iconOk.svg"
                    alt="yellow solid check"
                    class="pe-space-xxs"
                  />
                  Weeks per Class:
                </p>
                <p class="fs-small fw-bold ps-space-xxxs">
                  {{ selectedProgram.weeksPerClass }}
                </p>
              </div>
            </div>
            <div v-if="selectedProgram.shortDescription" class="pt-space-lg">
              <h2 class="pb-space-xs h2-small">Description</h2>
              <div
                class="text-medium"
                v-html="selectedProgram.shortDescription"
              ></div>
            </div>
          </div>
        </div>  
      </div>
    </div>-->
  </section>
</template>
  <script setup>
  import { ref } from "vue";
  
  const programs = ref([
    {
      
      degreeImage:
        "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/20170224dronelecture_08.JPG",
      title: "Political Science (BA)",
      weeksPerClass: "7.5",
      nextStartDate: "2024-01-08",
      totalCreditHours: "120",
      totalClasses: "39",
      shortDescription:
        "<p>The Bachelor of Arts in political science pairs the development of reasoning...</p>",
      category: "Undergraduate",
    },
    {
     
      degreeImage:
        "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/Frank-Smith-III-CONGRESS_0.jpg",
      title: "Political Science (BS)",
      weeksPerClass: "7.5",
      nextStartDate: "2024-01-08",
      totalCreditHours: "120",
      totalClasses: "40",
      shortDescription:
        "<p>The Bachelor of Science in political science focuses on...</p>",
      category: "Undergraduate",
    },
    {
        
        "degreeImage": "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/GlobalStudies_DegreeImage.jpg",
        "title": "Global Studies (BA)",
        "weeksPerClass": "7.5",
        "nextStartDate": "2024-01-08",
        "totalCreditHours": "120",
        "totalClasses": "39",
        "shortDescription": "<p>In an increasingly globalized society, it’s crucial that today’s leaders understand the impact of economics, the environment, culture, governance, human rights and religion throughout the world. Arizona State University’s Bachelor of Arts in global studies incorporates insights from multiple disciplines to support your growth as a student and a professional with an international focus.</p>\n",
        "category": "Undergraduate",
    },
    {
      
        "degreeImage": "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/220120-ASU-Thrive-PBC-4-JR-%281%29.jpg",
        "title": "Global Security (MA)",
        "weeksPerClass": "7.5",
        "nextStartDate": "2024-01-08",
        "totalCreditHours": "30",
        "totalClasses": "10",
        "shortDescription": "<p>The Master of Arts in global security is an interdisciplinary and thought-provoking program, linking serious ideas with practical case studies. In this security studies master’s program, you’ll be trained to critically engage global conflict and international security in a comprehensive manner.</p>\n",
        "category": "Graduate", 
    },
    {
        
        "degreeImage": "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/Human-Systems-Engineering-1-%281%29.jpg",
        "title": "Global Security – Cybersecurity (MA)",
        "weeksPerClass": "7.5",
        "nextStartDate": "2024-01-08",
        "totalCreditHours": "30",
        "totalClasses": "10",
        "shortDescription": "<p>In the Master of Arts in global security with a concentration in cybersecurity program, you’ll learn about important challenges facing the diplomatic, intelligence and military communities. By focusing on international cybersecurity, you can better understand the growing threat landscape faced by countries around the world.</p>\n",
        "category": "Graduate",

    },
    {
        
        "degreeImage": "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/20190313PolicyDesignStudio_032.JPG",
        "title": "Political Psychology (MA)",
        "weeksPerClass": "7.5",
        "nextStartDate": "2024-01-08",
        "totalCreditHours": "30",
        "totalClasses": "10",
        "shortDescription": "<p>The Master of Arts in political psychology explores the cognitive forces that influence political decision-making. In this program, you’ll examine voter behavior and learn how to apply this knowledge to political campaigns and communications.</p>\n",
        "category": "Graduate",
    },
    {
        "degreeImage": "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/International%20Affairs%20Hero%201.jpg",
        "title": "International Affairs and Leadership (MA)",
        "weeksPerClass": "7.5",
        "nextStartDate": "2024-01-08",
        "totalCreditHours": "30",
        "totalClasses": "10",
        "shortDescription": "<p>The online master’s in international affairs and leadership is ideal for individuals who are passionate about global issues and who want to make a positive impact on the world. You’ll prepare to become a leader in the international affairs realm.</p>\n",
        "category": "Graduate",
    },
  ]);
  
  const pageData = ref({
    sectionExplorePrograms: {
      title: "Explore political science and global studies degree programs",
      text: "The School of Politics and Global Studies offers seven online degree programs...",
    },
  });
  
  const selectedProgram = ref(programs.value[0]); // Default to the first program
  
  const selectedProgramData = (program) => {
    selectedProgram.value = program;
  };
  
  const triggerDlCarousel = (type, action) => {
    console.log(`${type} triggered: ${action}`);
  };
  
  const triggerDlCloseSideBar = (title) => {
    console.log(`Sidebar closed for: ${title}`);
  };
  
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };
  </script>

<style lang="scss">
.sidebar-image {
  background-size: cover;
  background-repeat: no-repeat;
  height: 250px;
}
@media (min-width: 992px) {
  .offcanvas {
    width: 37% !important;
    .offcanvas-body {
      padding: 0 !important;
    }
  }
}
</style>
