<template>
    <div>
      <!-- Passing data as props to the DegreeProgramsSection component -->
      <DegreeProgramsSection
        :sectionData="pageData.sectionExplorePrograms"
        :programs="degreePrograms"
      />
    </div>
  </template>
  
  <script>
  import DegreeProgramsSection from "@/components/DegreeCard.vue"; // Adjust the path as necessary
  
  export default {
    name: "ParentComponent",
    components: {
      DegreeProgramsSection,
    },
    data() {
      return {
        pageData: {
          sectionExplorePrograms: {
            title: "Explore political science and global studies degree programs",
            text: "The School of Politics and Global Studies offers seven online degree programs, including three undergraduate and four graduate degrees. Learn more about each option below.",
            degreePrograms: [
              "UGLA-LASGSBA",
              "UGLA-LAPOSBA",
              "UGLA-LAPOSBS",
              "GRLA-LAGSCMA",
              "GRLA-LAGSCSECMA",
              "GRLA-LAIALMA",
              "GRLA-LAPPSMA",
            ],
            sidebarContents: {
              date: "Next Start Date:",
              weeks: "Weeks per class:",
              classes: "Total classes:",
              creditHours: "Total credit hours:",
              descriptionLabel: "Description",
              featuredCoursesLabel: "Featured Courses",
            },
          },
        },
        degreePrograms: [
          {
            id: 94,
            code: "UGLA-LAPOSBA",
            degreeImage:
              "https://live-asuocms.ws.asu.edu/sites/default/files/program-images/20170224dronelecture_08.JPG",
            title: "Political Science (BA)",
            weeksPerClass: "7.5",
            nextStartDate: "2024-01-08",
            totalCreditHours: "120",
            totalClasses: "39",
            shortDescription:
              "<p>The Bachelor of Arts in political science pairs the development of reasoning and critical thinking with a curriculum focused on policy, public issues and citizens’ interactions with government. You’ll learn about local, national and international political concerns while building valuable skills needed for a successful career in the field.</p>",
            category: "Undergraduate",
            interestAreas: [
              "Law, criminal justice and public service",
              "Social Sciences",
            ],
            featuredCourses: {
              title: "Online political science degree courses",
              description:
                "<p>In addition to completing core courses, you’ll have the opportunity to focus on areas of individual interest through electives. Internships are another key component. As a student, you’ll learn to analyze policy, communicate effectively and engage in productive research. Examples of featured courses include:</p>",
              items: [
                {
                  category: null,
                  title: "POS 210: Political Ideologies (SB)",
                  description:
                    "Leading political ideas and belief systems, e.g., Marxism, liberalism, conservatism, theories of democracy, and alternative futures.",
                },
                {
                  category: null,
                  title: "POS 301: Empirical Political Inquiry (SB)",
                  description:
                    "Logic of political inquiry, including research problems, concepts, hypotheses, theories, measurement, data collection, and analysis.",
                },
                // Add other featured courses as needed
              ],
            },
          },
          // Add other degree programs here
        ],
      };
    },
  };
  </script>