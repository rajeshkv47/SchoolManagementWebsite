const SITE = {

  // =========================
  // HOMEPAGE - SLIDER
  // =========================

  slider1heading1: "Welcome to <span style='font-size:50px'>Rajesh It Institue</span>",
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
  // HOME PAGE - Principal Section
  // =========================

  principalmessagetitle: "Principal&#39;s Message",
  principalmessagetitle2: "A Message From Our<span class='text-[#08766e]'>Principal </span>",
  principalphoto1: "https://i.pinimg.com/736x/e4/5a/c7/e45ac728a5f336ea9be15d687a95f749.jpg",
  principalname: "Dr. Rajesh Kumar",
  principalText2: "Principal", 
  principalText2: "&#8220;Education is not only about acquiring knowledge;            it is about developing character, confidence,            creativity and the ability to make a positive            difference in the world.&#8221",
  principalText3: "At our institution, we believe that every student          has unique potential and deserves the right            environment to discover and develop it. Our            commitment is to provide an education that combines            academic excellence with strong values and            practical learning.",
  
  principalText4:"Our dedicated teachers work closely with students            to encourage curiosity, creativity and confidence.             We continuously embrace innovative teaching            practices and technology to make learning more            meaningful and  ngaging.",
  
  principalText5:"Together with our parents and the entire academic            community, we are committed to nurturing responsible,            compassionate and capable individuals who are            prepared to meet the challenges of tomorrow.",
  
  // =========================
  // SCHOOL / COLLEGE DETAILS
  // =========================

  name: "RAJESH <span class='text-[#ffa51c]'>ITI</span>",
  address: "Gonda <i>Uttar Pradesh</i>",

  logo:
    "https://images.seeklogo.com/logo-png/61/1/school-logo-png_seeklogo-616539.png",

  mobile: "9807711987",
  whatsapp: "919807711987",
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
