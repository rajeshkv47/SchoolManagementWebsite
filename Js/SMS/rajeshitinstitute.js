const SITE = { 
  name: "RAJESH <span class='text-[#ffa51c]'>ITI</span>",
  address: "Gonda <i>Uttar Pradesh</i>",
  mobile: "9569318202",
  whatsapp: "9219757889",
  email: "rajeshitinstitute@gmail.com",

  facebook: "https://www.facebook.com/ritinstitute2014/",
  instagram: "https://www.instagram.com/rajeshitinstitute/",
  youtube: "https://www.youtube.com/@RajeshITInstitute",
  twitter: "https://x.com/RITInstitute",

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
