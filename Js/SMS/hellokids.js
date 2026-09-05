const SITE = {

  // =========================
  // HOMEPAGE - SLIDER
  // =========================

  slider1heading1: "Welcome to <span style='font-size:50px'>Hello Kids</span>",
  slider1heading1description:
    "Building knowledge, skills and a brighter future.",

  slider2heading1: "Learn. Grow. Succeed.",
  slider2heading1description:
    "Quality education with modern learning facilities.",

  slider3heading1: "Your Future Starts Here",
  slider3heading1description:
    "Discover opportunities and achieve your goals.",


  // =========================
  // HOME PAGE - ABOUT
  // =========================

  AboutImageovertext1: "18+",
  AboutImageovertext2: "Years Of Excellence",
  AboutImageovertext3: "Our Education System",
  AboutImageovertext4: "Inspires You More.",

  AboutImageovertext5:
    "We believe that quality education is the foundation of a successful future. Our learning environment encourages students to discover their potential, develop confidence and achieve their goals.",

  AboutImageovertext6: "Quality Education",
  AboutImageovertext7: "Modern and effective learning methods.",

  AboutImageovertext8: "Experienced Teachers",
  AboutImageovertext9: "Dedicated teachers supporting every student.",

  AboutImageovertext10: "Smart Learning",
  AboutImageovertext11: "Student Development.",
  AboutImageovertext12: "Focus on academic and personal growth.",

  AboutImageovertext13: "Professional Faculty",
  AboutImageovertext14: "Dedicated for your success",


  // =========================
  // SCHOOL / COLLEGE DETAILS
  // =========================

  name: "Hello <span class='text-[#ffa51c]'>Kids</span>",
  address: "Haidergarh <i> Barabanki</i>",

  logo:
    "https://images.seeklogo.com/logo-png/61/1/school-logo-png_seeklogo-616539.png",

  mobile: "9919678269",
  whatsapp: "9919678269",
  email: "admission@yourschool.com",

  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
  twitter: "https://www.twitter.com/",

  website: "https://ritiwebsolution.blogspot.com/",

  notice:
    "Admission Open from 1 Apr 2026 | 28 Aug Raksha Bandhan Holiday",

  fee: "#"
};


// ======================================
// AUTOMATIC CONTENT + LINKS UPDATE
// ======================================

Object.keys(SITE).forEach(key => {

  document.querySelectorAll(".site-" + key).forEach(el => {

    const value = SITE[key];


    // ==================================
    // A TAG
    // ==================================

    if (el.tagName === "A") {

      // ==================================
      // AUTOMATIC HREF
      // ==================================

      el.href =
        key === "mobile"
          ? "tel:" + value
          : key === "whatsapp"
          ? "https://wa.me/" + value
          : key === "email"
          ? "mailto:" + value
          : value;


      // ==================================
      // LINKS WITH ICON / EXISTING CONTENT
      // ==================================

      if (
        key === "mobile" ||
        key === "whatsapp" ||
        key === "facebook" ||
        key === "instagram" ||
        key === "youtube" ||
        key === "twitter" ||
        key === "email"
      ) {

        /*
         * Agar already icon ya content hai
         * to kuch bhi replace nahi hoga.
         */

        if (el.innerHTML.trim() === "") {
          el.textContent = value;
        }

      }


      // ==================================
      // OTHER A TAGS
      // ==================================

      else {

        el.innerHTML = value;

      }

    }


    // ==================================
    // IMAGE
    // ==================================

    else if (el.tagName === "IMG") {

      el.src = value;

    }


    // ==================================
    // NORMAL CONTENT
    // ==================================

    else {

      el.innerHTML = value;

    }

  });

});
