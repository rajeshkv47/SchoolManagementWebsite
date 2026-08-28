//Parent Testimonial
(function () {
 
  function initHSParentTestimonialSlider() { 
    var hsParentTestimonialRoot =
      document.getElementById(
        "hs-parent-testimonial-section"
      );


    if (!hsParentTestimonialRoot) {
      return;
    }
 

    var hsParentTestimonialSlider =
      hsParentTestimonialRoot.querySelector(
        "#hs-parent-testimonial-slider"
      );


    var hsParentTestimonialTrack =
      hsParentTestimonialRoot.querySelector(
        "#hs-parent-testimonial-track"
      );


    var hsParentTestimonialPrev =
      hsParentTestimonialRoot.querySelector(
        "#hs-parent-testimonial-prev"
      );


    var hsParentTestimonialNext =
      hsParentTestimonialRoot.querySelector(
        "#hs-parent-testimonial-next"
      );


    var hsParentTestimonialDots =
      hsParentTestimonialRoot.querySelector(
        "#hs-parent-testimonial-dots"
      );


    if (
      !hsParentTestimonialSlider ||
      !hsParentTestimonialTrack ||
      !hsParentTestimonialPrev ||
      !hsParentTestimonialNext ||
      !hsParentTestimonialDots
    ) {

      return;

    }
 

    var hsParentTestimonialCards =
      Array.from(
        hsParentTestimonialTrack.querySelectorAll(
          ".hs-parent-testimonial-card"
        )
      );


    if (!hsParentTestimonialCards.length) {
      return;
    }
 

    var hsParentTestimonialCurrentIndex = 0;

    var hsParentTestimonialStartX = 0;

    var hsParentTestimonialCurrentX = 0;

    var hsParentTestimonialIsDragging = false;

    var hsParentTestimonialAutoTimer = null;

    var hsParentTestimonialResizeTimer = null;


    /* =======================================================
       CONSTANTS
    ======================================================= */

    var hsParentTestimonialGap = 20;

    var hsParentTestimonialAutoDelay = 5000;


    /* =======================================================
       GET VISIBLE CARDS
    ======================================================= */

    function hsParentTestimonialGetVisibleCount() {

      var width = window.innerWidth;


      if (width >= 1024) {
        return 3;
      }


      if (width >= 768) {
        return 2;
      }


      return 1;

    }
 

    function hsParentTestimonialGetMaxIndex() {

      var visibleCount =
        hsParentTestimonialGetVisibleCount();


      return Math.max(
        0,
        hsParentTestimonialCards.length -
        visibleCount
      );

    }

 

    function hsParentTestimonialUpdateSlider(
      animate
    ) {

      if (
        typeof animate === "undefined"
      ) {

        animate = true;

      }


      if (
        !hsParentTestimonialCards.length
      ) {

        return;

      }


      var cardWidth =
        hsParentTestimonialCards[0]
          .getBoundingClientRect()
          .width;


      var move =
        hsParentTestimonialCurrentIndex *
        (cardWidth + hsParentTestimonialGap);


      hsParentTestimonialTrack.style.transition =
        animate
          ? "transform 500ms ease"
          : "none";


      hsParentTestimonialTrack.style.transform =
        "translate3d(-" +
        move +
        "px,0,0)";


      hsParentTestimonialUpdateDots();

    }
 

    function hsParentTestimonialCreateDots() {

      hsParentTestimonialDots.innerHTML = "";


      var total =
        hsParentTestimonialGetMaxIndex() + 1;


      for (
        var i = 0;
        i < total;
        i++
      ) {

        var hsParentTestimonialDot =
          document.createElement("button");


        hsParentTestimonialDot.type =
          "button";


        hsParentTestimonialDot.setAttribute(
          "aria-label",
          "Parent testimonial " + (i + 1)
        );


        hsParentTestimonialDot.className =
          "hs-parent-testimonial-dot " +
          "w-2 h-2 rounded-full " +
          "bg-slate-300 " +
          "transition-all duration-300";


        hsParentTestimonialDot.dataset.index =
          i;


        hsParentTestimonialDot.addEventListener(
          "click",
          function () {

            hsParentTestimonialCurrentIndex =
              parseInt(
                this.dataset.index,
                10
              );


            hsParentTestimonialUpdateSlider(
              true
            );


            hsParentTestimonialRestartAuto();

          }
        );


        hsParentTestimonialDots.appendChild(
          hsParentTestimonialDot
        );

      }


      hsParentTestimonialUpdateDots();

    }
 

    function hsParentTestimonialUpdateDots() {

      var hsParentTestimonialAllDots =
        hsParentTestimonialDots.querySelectorAll(
          ".hs-parent-testimonial-dot"
        );


      hsParentTestimonialAllDots.forEach(
        function (
          hsParentTestimonialDot,
          index
        ) {

          if (
            index ===
            hsParentTestimonialCurrentIndex
          ) {

            hsParentTestimonialDot.classList.remove(
              "w-2",
              "bg-slate-300"
            );


            hsParentTestimonialDot.classList.add(
              "w-7",
              "bg-blue-600"
            );

          }

          else {

            hsParentTestimonialDot.classList.remove(
              "w-7",
              "bg-blue-600"
            );


            hsParentTestimonialDot.classList.add(
              "w-2",
              "bg-slate-300"
            );

          }

        }
      );

    }
 

    function hsParentTestimonialNextSlide() {

      var maxIndex =
        hsParentTestimonialGetMaxIndex();


      if (maxIndex <= 0) {
        return;
      }


      if (
        hsParentTestimonialCurrentIndex >=
        maxIndex
      ) {

        hsParentTestimonialCurrentIndex = 0;

      }

      else {

        hsParentTestimonialCurrentIndex++;

      }


      hsParentTestimonialUpdateSlider(true);

    }
 

    function hsParentTestimonialPreviousSlide() {

      var maxIndex =
        hsParentTestimonialGetMaxIndex();


      if (maxIndex <= 0) {
        return;
      }


      if (
        hsParentTestimonialCurrentIndex <= 0
      ) {

        hsParentTestimonialCurrentIndex =
          maxIndex;

      }

      else {

        hsParentTestimonialCurrentIndex--;

      }


      hsParentTestimonialUpdateSlider(true);

    }
 

    function hsParentTestimonialStopAuto() {

      if (
        hsParentTestimonialAutoTimer
      ) {

        clearInterval(
          hsParentTestimonialAutoTimer
        );


        hsParentTestimonialAutoTimer =
          null;

      }

    }
 

    function hsParentTestimonialStartAuto() {

      hsParentTestimonialStopAuto();


      hsParentTestimonialAutoTimer =
        setInterval(
          function () {

            hsParentTestimonialNextSlide();

          },
          hsParentTestimonialAutoDelay
        );

    }
 

    function hsParentTestimonialRestartAuto() {

      hsParentTestimonialStartAuto();

    }
 

    hsParentTestimonialNext.addEventListener(
      "click",
      function () {

        hsParentTestimonialNextSlide();

        hsParentTestimonialRestartAuto();

      }
    );


    /* =======================================================
       PREVIOUS BUTTON
    ======================================================= */

    hsParentTestimonialPrev.addEventListener(
      "click",
      function () {

        hsParentTestimonialPreviousSlide();

        hsParentTestimonialRestartAuto();

      }
    );


    /* =======================================================
       MOUSE DOWN
    ======================================================= */

    hsParentTestimonialSlider.addEventListener(
      "mousedown",
      function (event) {

        hsParentTestimonialIsDragging = true;

        hsParentTestimonialStartX =
          event.clientX;

        hsParentTestimonialCurrentX =
          event.clientX;


        hsParentTestimonialStopAuto();


        hsParentTestimonialTrack.style.transition =
          "none";


        hsParentTestimonialSlider.classList.remove(
          "cursor-grab"
        );


        hsParentTestimonialSlider.classList.add(
          "cursor-grabbing"
        );

      }
    );


    /* =======================================================
       MOUSE MOVE
    ======================================================= */

    window.addEventListener(
      "mousemove",
      function (event) {

        if (
          !hsParentTestimonialIsDragging
        ) {

          return;

        }


        hsParentTestimonialCurrentX =
          event.clientX;

      }
    );


    /* =======================================================
       MOUSE UP
    ======================================================= */

    window.addEventListener(
      "mouseup",
      function () {

        if (
          !hsParentTestimonialIsDragging
        ) {

          return;

        }


        hsParentTestimonialIsDragging =
          false;


        hsParentTestimonialSlider.classList.remove(
          "cursor-grabbing"
        );


        hsParentTestimonialSlider.classList.add(
          "cursor-grab"
        );


        var difference =
          hsParentTestimonialCurrentX -
          hsParentTestimonialStartX;


        if (
          Math.abs(difference) > 60
        ) {

          if (difference < 0) {

            hsParentTestimonialNextSlide();

          }

          else {

            hsParentTestimonialPreviousSlide();

          }

        }

        else {

          hsParentTestimonialUpdateSlider(
            true
          );

        }


        hsParentTestimonialRestartAuto();

      }
    );


    /* =======================================================
       TOUCH START
    ======================================================= */

    hsParentTestimonialSlider.addEventListener(
      "touchstart",
      function (event) {

        hsParentTestimonialStartX =
          event.touches[0].clientX;

        hsParentTestimonialCurrentX =
          hsParentTestimonialStartX;


        hsParentTestimonialStopAuto();

      },
      {
        passive: true
      }
    );


    /* =======================================================
       TOUCH MOVE
    ======================================================= */

    hsParentTestimonialSlider.addEventListener(
      "touchmove",
      function (event) {

        hsParentTestimonialCurrentX =
          event.touches[0].clientX;

      },
      {
        passive: true
      }
    );


    /* =======================================================
       TOUCH END
    ======================================================= */

    hsParentTestimonialSlider.addEventListener(
      "touchend",
      function () {

        var difference =
          hsParentTestimonialCurrentX -
          hsParentTestimonialStartX;


        if (
          Math.abs(difference) > 50
        ) {

          if (difference < 0) {

            hsParentTestimonialNextSlide();

          }

          else {

            hsParentTestimonialPreviousSlide();

          }

        }

        else {

          hsParentTestimonialUpdateSlider(
            true
          );

        }


        hsParentTestimonialRestartAuto();

      }
    );


    /* =======================================================
       PAUSE WHEN MOUSE ENTERS
    ======================================================= */

    hsParentTestimonialRoot.addEventListener(
      "mouseenter",
      function () {

        hsParentTestimonialStopAuto();

      }
    );


    /* =======================================================
       RESUME WHEN MOUSE LEAVES
    ======================================================= */

    hsParentTestimonialRoot.addEventListener(
      "mouseleave",
      function () {

        if (
          !hsParentTestimonialIsDragging
        ) {

          hsParentTestimonialStartAuto();

        }

      }
    );


    /* =======================================================
       RESIZE
    ======================================================= */

    window.addEventListener(
      "resize",
      function () {

        clearTimeout(
          hsParentTestimonialResizeTimer
        );


        hsParentTestimonialResizeTimer =
          setTimeout(
            function () {

              var maxIndex =
                hsParentTestimonialGetMaxIndex();


              if (
                hsParentTestimonialCurrentIndex >
                maxIndex
              ) {

                hsParentTestimonialCurrentIndex =
                  maxIndex;

              }


              hsParentTestimonialCreateDots();


              hsParentTestimonialUpdateSlider(
                false
              );

            },
            150
          );

      }
    );


    /* =======================================================
       INITIALIZE
    ======================================================= */

    hsParentTestimonialCreateDots();

    hsParentTestimonialUpdateSlider(false);

    hsParentTestimonialStartAuto();

  }



  /* =========================================================
     DOM READY
  ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initHSParentTestimonialSlider
    );

  }

  else {

    initHSParentTestimonialSlider();

  }

})();

//Parent Testimonila
