

//Teacher Start 
(function () {

  function initHSTeacherSlider() {

    /* =====================================================
       MAIN TEACHER SECTION
    ====================================================== */

    const root = document.getElementById("hs-teacher-section");

    if (!root) {
      return;
    }


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const slider =
      root.querySelector("#hs-teacher-slider");

    const viewport =
      root.querySelector("#hs-teacher-viewport");

    const track =
      root.querySelector("#hs-teacher-track");

    const cards =
      Array.from(
        root.querySelectorAll(".hs-teacher-card")
      );

    const nextBtn =
      root.querySelector("#hs-teacher-next");

    const prevBtn =
      root.querySelector("#hs-teacher-prev");

    const nextMobile =
      root.querySelector("#hs-teacher-next-mobile");

    const prevMobile =
      root.querySelector("#hs-teacher-prev-mobile");

    const dotsContainer =
      root.querySelector("#hs-teacher-dots");


    /* =====================================================
       SAFETY CHECK
    ====================================================== */

    if (!slider ||
        !viewport ||
        !track ||
        !cards.length ||
        !dotsContainer) {

      console.warn(
        "HS Teacher Slider: Required element missing."
      );

      return;
    }


    /* =====================================================
       VARIABLES
    ====================================================== */

    let currentIndex = 0;

    let visibleCount = 4;

    let cardWidth = 0;

    let gap = 20;

    let autoTimer = null;

    let startX = 0;

    let currentX = 0;

    let isDragging = false;

    let resizeTimer = null;


    /* =====================================================
       GET VISIBLE CARD COUNT
    ====================================================== */

    function getVisibleCount() {

      const width = window.innerWidth;

      if (width >= 1024) {

        return 4;

      }

      if (width >= 640) {

        return 2;

      }

      return 1;

    }


    /* =====================================================
       CALCULATE DIMENSIONS
    ====================================================== */

    function calculateDimensions() {

      visibleCount =
        getVisibleCount();


      const viewportWidth =
        viewport.clientWidth;


      if (visibleCount === 1) {

        gap = 16;

      }
      else {

        gap = 20;

      }


      /*
       * Calculate card width
       */

      cardWidth =
        (
          viewportWidth -
          gap * (visibleCount - 1)
        ) / visibleCount;


      cards.forEach(function (card) {

        card.style.width =
          cardWidth + "px";

      });


      /*
       * Correct current index after resize
       */

      const maxIndex =
        getMaxIndex();


      if (currentIndex > maxIndex) {

        currentIndex = maxIndex;

      }

    }


    /* =====================================================
       MAX INDEX
    ====================================================== */

    function getMaxIndex() {

      return Math.max(
        0,
        cards.length - visibleCount
      );

    }


    /* =====================================================
       MOVE SLIDER
    ====================================================== */

    function moveSlider(animate) {

      if (animate === undefined) {

        animate = true;

      }


      const distance =
        currentIndex *
        (cardWidth + gap);


      track.style.transition =
        animate
          ? "transform 450ms ease"
          : "none";


      track.style.transform =
        "translate3d(-" +
        distance +
        "px, 0, 0)";


      updateDots();

    }


    /* =====================================================
       CREATE DOTS
    ====================================================== */

    function createDots() {

      /*
       * IMPORTANT:
       * Prevent null error
       */

      if (!dotsContainer) {

        return;

      }


      dotsContainer.innerHTML = "";


      const total =
        getMaxIndex() + 1;


      /*
       * If all teachers fit on screen,
       * don't need multiple dots.
       */

      for (
        let i = 0;
        i < total;
        i++
      ) {

        const dot =
          document.createElement("button");


        dot.type =
          "button";


        dot.setAttribute(
          "aria-label",
          "Teacher page " + (i + 1)
        );


        dot.className =
          "hs-teacher-dot " +
          "h-2 w-2 rounded-full " +
          "bg-slate-300 " +
          "transition-all duration-300";


        dot.addEventListener(
          "click",
          function () {

            currentIndex = i;

            moveSlider(true);

            restartAuto();

          }
        );


        dotsContainer.appendChild(dot);

      }


      updateDots();

    }


    /* =====================================================
       UPDATE DOTS
    ====================================================== */

    function updateDots() {

      if (!dotsContainer) {

        return;

      }


      const dots =
        dotsContainer.querySelectorAll(
          ".hs-teacher-dot"
        );


      dots.forEach(
        function (dot, index) {

          if (
            index === currentIndex
          ) {

            dot.classList.remove(
              "w-2",
              "bg-slate-300"
            );

            dot.classList.add(
              "w-6",
              "bg-blue-600"
            );

          }
          else {

            dot.classList.remove(
              "w-6",
              "bg-blue-600"
            );

            dot.classList.add(
              "w-2",
              "bg-slate-300"
            );

          }

        }
      );

    }


    /* =====================================================
       NEXT SLIDE
    ====================================================== */

    function nextSlide() {

      const max =
        getMaxIndex();


      if (max <= 0) {

        return;

      }


      if (currentIndex >= max) {

        currentIndex = 0;

      }
      else {

        currentIndex++;

      }


      moveSlider(true);

    }


    /* =====================================================
       PREVIOUS SLIDE
    ====================================================== */

    function previousSlide() {

      const max =
        getMaxIndex();


      if (max <= 0) {

        return;

      }


      if (currentIndex <= 0) {

        currentIndex = max;

      }
      else {

        currentIndex--;

      }


      moveSlider(true);

    }


    /* =====================================================
       AUTO SLIDER
    ====================================================== */

    function startAuto() {

      stopAuto();


      /*
       * Auto slide every 4 seconds
       */

      autoTimer =
        setInterval(
          function () {

            nextSlide();

          },
          4000
        );

    }


    function stopAuto() {

      if (autoTimer) {

        clearInterval(autoTimer);

        autoTimer = null;

      }

    }


    function restartAuto() {

      startAuto();

    }


    /* =====================================================
       DESKTOP NEXT
    ====================================================== */

    if (nextBtn) {

      nextBtn.addEventListener(
        "click",
        function () {

          nextSlide();

          restartAuto();

        }
      );

    }


    /* =====================================================
       DESKTOP PREVIOUS
    ====================================================== */

    if (prevBtn) {

      prevBtn.addEventListener(
        "click",
        function () {

          previousSlide();

          restartAuto();

        }
      );

    }


    /* =====================================================
       MOBILE NEXT
    ====================================================== */

    if (nextMobile) {

      nextMobile.addEventListener(
        "click",
        function () {

          nextSlide();

          restartAuto();

        }
      );

    }


    /* =====================================================
       MOBILE PREVIOUS
    ====================================================== */

    if (prevMobile) {

      prevMobile.addEventListener(
        "click",
        function () {

          previousSlide();

          restartAuto();

        }
      );

    }


    /* =====================================================
       MOUSE DRAG
    ====================================================== */

    track.addEventListener(
      "mousedown",
      function (event) {

        isDragging = true;

        startX =
          event.clientX;

        currentX =
          event.clientX;


        stopAuto();


        track.style.transition =
          "none";


        track.style.cursor =
          "grabbing";

      }
    );


    window.addEventListener(
      "mousemove",
      function (event) {

        if (!isDragging) {

          return;

        }


        currentX =
          event.clientX;


        const difference =
          currentX - startX;


        const baseDistance =
          currentIndex *
          (cardWidth + gap);


        track.style.transform =
          "translate3d(" +
          (-baseDistance + difference) +
          "px,0,0)";

      }
    );


    window.addEventListener(
      "mouseup",
      function () {

        if (!isDragging) {

          return;

        }


        isDragging = false;


        track.style.cursor =
          "grab";


        const difference =
          currentX - startX;


        if (
          Math.abs(difference) > 50
        ) {

          if (difference < 0) {

            nextSlide();

          }
          else {

            previousSlide();

          }

        }
        else {

          moveSlider(true);

        }


        restartAuto();

      }
    );


    /* =====================================================
       TOUCH SWIPE
    ====================================================== */

    viewport.addEventListener(
      "touchstart",
      function (event) {

        startX =
          event.touches[0].clientX;

        currentX =
          startX;

        stopAuto();

      },
      {
        passive: true
      }
    );


    viewport.addEventListener(
      "touchmove",
      function (event) {

        currentX =
          event.touches[0].clientX;

      },
      {
        passive: true
      }
    );


    viewport.addEventListener(
      "touchend",
      function () {

        const difference =
          currentX - startX;


        if (
          Math.abs(difference) > 45
        ) {

          if (difference < 0) {

            nextSlide();

          }
          else {

            previousSlide();

          }

        }
        else {

          moveSlider(true);

        }


        restartAuto();

      }
    );


    /* =====================================================
       PAUSE ON HOVER
    ====================================================== */

    root.addEventListener(
      "mouseenter",
      function () {

        stopAuto();

      }
    );


    root.addEventListener(
      "mouseleave",
      function () {

        if (!isDragging) {

          startAuto();

        }

      }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
      "resize",
      function () {

        clearTimeout(resizeTimer);


        resizeTimer =
          setTimeout(
            function () {

              calculateDimensions();

              createDots();

              moveSlider(false);

            },
            150
          );

      }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    calculateDimensions();

    createDots();

    moveSlider(false);

    startAuto();

  }


  /* =======================================================
     DOM READY
  ======================================================== */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initHSTeacherSlider
    );

  }
  else {

    initHSTeacherSlider();

  }

})();
//Teacher End

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HERO SLIDER SETTINGS
    ===================================================== */

    const heroX_speed = 5000;       // Auto slide speed in milliseconds
    const heroX_transition = 700;  // Slide animation speed


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const heroX_slider =
        document.querySelector(".heroX_slider");

    const heroX_track =
        document.getElementById("heroX_track");

    const heroX_slides =
        document.querySelectorAll(".heroX_slide");

    const heroX_dots =
        document.querySelectorAll(".heroX_dot");


    if (!heroX_slider || !heroX_track || !heroX_slides.length) {
        return;
    }


    /* =====================================================
       VARIABLES
    ===================================================== */

    let heroX_current = 0;

    let heroX_timer = null;

    let heroX_startX = 0;

    let heroX_currentX = 0;

    let heroX_isDragging = false;

    let heroX_dragDistance = 0;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function heroX_showSlide(index, animate = true) {

        if (index < 0) {
            index = heroX_slides.length - 1;
        }

        if (index >= heroX_slides.length) {
            index = 0;
        }

        heroX_current = index;


        heroX_track.style.transition =
            animate
                ? `transform ${heroX_transition}ms ease`
                : "none";


        heroX_track.style.transform =
            `translateX(-${heroX_current * 100}%)`;


        /* UPDATE DOTS */

        heroX_dots.forEach(function (dot, i) {

            if (i === heroX_current) {

                dot.classList.remove("bg-white/50");
                dot.classList.add("bg-white");

            } else {

                dot.classList.remove("bg-white");
                dot.classList.add("bg-white/50");

            }

        });

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function heroX_next() {

        heroX_showSlide(heroX_current + 1);

    }


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    function heroX_startAuto() {

        heroX_stopAuto();

        heroX_timer =
            setInterval(function () {

                heroX_next();

            }, heroX_speed);

    }


    function heroX_stopAuto() {

        if (heroX_timer) {

            clearInterval(heroX_timer);

            heroX_timer = null;

        }

    }


    /* =====================================================
       DOT CLICK
    ===================================================== */

    heroX_dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const index =
                parseInt(dot.getAttribute("data-hero-dot"));

            heroX_showSlide(index);

            heroX_startAuto();

        });

    });


    /* =====================================================
       MOUSE DRAG
    ===================================================== */

    heroX_slider.addEventListener(
        "mousedown",
        function (event) {

            heroX_isDragging = true;

            heroX_startX = event.clientX;

            heroX_currentX = event.clientX;

            heroX_dragDistance = 0;

            heroX_stopAuto();

            heroX_track.style.transition = "none";

        }
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!heroX_isDragging) {
                return;
            }

            heroX_currentX = event.clientX;

            heroX_dragDistance =
                heroX_currentX - heroX_startX;

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            if (!heroX_isDragging) {
                return;
            }

            heroX_isDragging = false;


            const threshold = 70;


            if (Math.abs(heroX_dragDistance) > threshold) {

                if (heroX_dragDistance < 0) {

                    heroX_next();

                } else {

                    heroX_showSlide(heroX_current - 1);

                }

            } else {

                heroX_showSlide(heroX_current);

            }


            heroX_startAuto();

        }
    );


    /* =====================================================
       TOUCH / MOBILE DRAG
    ===================================================== */

    heroX_slider.addEventListener(
        "touchstart",
        function (event) {

            heroX_startX =
                event.touches[0].clientX;

            heroX_currentX =
                event.touches[0].clientX;

            heroX_dragDistance = 0;

            heroX_stopAuto();

            heroX_track.style.transition = "none";

        },
        { passive: true }
    );


    heroX_slider.addEventListener(
        "touchmove",
        function (event) {

            heroX_currentX =
                event.touches[0].clientX;

            heroX_dragDistance =
                heroX_currentX - heroX_startX;

        },
        { passive: true }
    );


    heroX_slider.addEventListener(
        "touchend",
        function () {

            const threshold = 60;


            if (Math.abs(heroX_dragDistance) > threshold) {

                if (heroX_dragDistance < 0) {

                    heroX_next();

                } else {

                    heroX_showSlide(heroX_current - 1);

                }

            } else {

                heroX_showSlide(heroX_current);

            }


            heroX_startAuto();

        }
    );


    /* =====================================================
       PAUSE ON DESKTOP HOVER
    ===================================================== */

    heroX_slider.addEventListener(
        "mouseenter",
        function () {

            heroX_stopAuto();

        }
    );


    heroX_slider.addEventListener(
        "mouseleave",
        function () {

            if (!heroX_isDragging) {

                heroX_startAuto();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    heroX_showSlide(0, false);

    heroX_startAuto();

});
 
//MOBILE MENU JAVASCRIPT
document.addEventListener("DOMContentLoaded", function () {

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const menuIcon =
        document.getElementById("menuIcon");


    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function () {

            const isOpen =
                !mobileMenu.classList.contains("hidden");


            if (isOpen) {

                mobileMenu.classList.add("hidden");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuIcon.className =
                    "fa-solid fa-bars text-[25px]";

            }
            else {

                mobileMenu.classList.remove("hidden");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuIcon.className =
                    "fa-solid fa-xmark text-[27px]";

            }

        });

    }


    /* =========================================
       MOBILE SUBMENUS
    ========================================= */

    const dropdownButtons =
        document.querySelectorAll(
            ".mobile-dropdown-btn"
        );


    dropdownButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const submenu =
                    button.nextElementSibling;

                const isOpen =
                    submenu.classList.contains("active");


                /*
                   Close all submenus
                */

                document
                    .querySelectorAll(
                        ".mobile-submenu"
                    )
                    .forEach(function (menu) {

                        menu.classList.remove(
                            "active"
                        );

                    });


                /*
                   Reset arrows
                */

                document
                    .querySelectorAll(
                        ".mobile-dropdown-btn"
                    )
                    .forEach(function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    });


                /*
                   Open selected
                */

                if (!isOpen) {

                    submenu.classList.add(
                        "active"
                    );

                    button.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /* =========================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ========================================= */

    document
        .querySelectorAll(
            "#mobileMenu a"
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.add(
                        "hidden"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuIcon.className =
                        "fa-solid fa-bars text-[25px]";

                }
            );

        });


});
