<template>
  <div></div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import IntroJs from "intro.js";

export default {
  name: "IntroComponent",
  setup() {
    const intro = ref(null);

    const startIntro = () => {
      if (intro.value) {
        intro.value.setOptions({
          steps: [
            {
              element: document.querySelector("#categories"),
              intro: "1. Create your first category here.",
              position: "right",
            },
            {
              element: document.querySelector("#products"),
              intro:
                "2. Create your first product under the category you created earlier.",
              position: "right",
            },
            {
              element: document.querySelector("#transactions"),
              intro:
                "3. Create your first transaction here by using the category and the product created earlier.",
              position: "right",
            },
            // Add more steps as needed
          ],
          tooltipClass: "custom-tooltip", // Custom class for tooltips
          highlightClass: "custom-highlight", // Custom class for highlighted elements
          showProgress: true, // Show progress bar
          showStepNumbers: false, // Show step numbers
          disableInteraction: true, // Allow user interaction during guide
          exitOnOverlayClick: false, // Allow exiting guide on overlay click
        });
        intro.value.start();
      }
    };

    const handleIntroComplete = () => {
      // Save a key-value pair in localStorage to indicate the intro is finished
      localStorage.setItem("introFinished", "true");
    };

    onMounted(() => {
      intro.value = IntroJs();
      intro.value.oncomplete(handleIntroComplete);
    });

    watch(
      () => intro.value,
      (newValue) => {
        if (newValue && localStorage.getItem("introFinished") !== "true") {
          startIntro();
        }
      }
    );

    return {
      startIntro,
    };
  },
};
</script>

<style>
/* Import Intro.js styles */
@import "intro.js/introjs.css";

/* Custom class for tooltips */
.custom-tooltip {
}

/* Custom class for highlighted elements */
.custom-highlight {
}
</style>
