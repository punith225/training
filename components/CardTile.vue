<template>
    <div class="pt-space-xl bg-light section-bg-whysuo pb-space-xl">
      <div class="container">
        <!-- Title Section -->
        <div class="mb-0 text-center pb-space-md">
          <h2 class="h2-medium font-weight-bold">
            {{ "Why choose ASU Online?" }}
          </h2>
        </div>
  
        <!-- Cards Section -->
        <div class="row">
          <!-- Card 1 -->
          <div class="col-lg-4 col-md-4 col-12 d-lg-flex align-items-lg-stretch flex-lg-row">
            <CardImageTile
              :bg-image-src="card1Image"
              title="Leader in innovation"
              text="ASU has been named #1 in innovation for 9 consecutive years by U.S. News & World Report. Find out what makes ASU Online unique."
              class="mb-space-md"
              cta-text="Learn more about ASU Online"
            ></CardImageTile>
          </div>
  
          <!-- Card 2 -->
          <div class="col-lg-4 col-md-4 col-12 d-lg-flex align-items-lg-stretch flex-lg-row">
            <CardImageTile
              :bg-image-src="card2Image"
              title="A global top-choice university"
              text="ASU was named a top 10 university in the U.S. chosen by international students, according to the Institute of International Education, 2022."
              class="mb-space-md"
              cta-text="Learn about attending ASU Online as an international student"
            ></CardImageTile>
          </div>
  
          <!-- Card 3 -->
          <div class="col-lg-4 col-md-4 col-12 d-lg-flex align-items-lg-stretch flex-lg-row">
            <CardImageTile
              :bg-image-src="card3Image"
              title="World-class faculty"
              text="ASU Online courses include the same rigorous curriculum, taught by the same renowned faculty who teach on campus."
              class="mb-space-md"
              cta-text="Learn more about ASU Online faculty"
            ></CardImageTile>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Import images directly
  import card1Image from '@/assets/images/whyAsu1.png';
  import card2Image from '@/assets/images/whyAsu2.png';
  import card3Image from '@/assets/images/whyAsu3.png';
  </script>