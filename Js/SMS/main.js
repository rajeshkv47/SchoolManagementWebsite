const SITE = { 
  // =========================
  // SCHOOL / COLLEGE DETAILS
  // =========================

  name: "College <span class='text-[#ffa51c]'>Name</span>",
  address: "Lucknow <i>Uttar Pradesh</i>", 
  mobile: "9807711987",
  whatsapp: "919807711987",
  email: "admission@yourschool.com", 
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
  twitter: "https://www.twitter.com/", 
  website: "https://ritiwebsolution.blogspot.com/",  
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
