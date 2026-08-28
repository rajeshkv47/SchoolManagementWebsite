const SITE = {
  name: "College<b> Name</b>2",
  address: "Gonda, <b> Uttar</b> Pradesh",
  logo: "https://images.seeklogo.com/logo-png/61/1/school-logo-png_seeklogo-616539.png",
  mobile: "19807711987",
  mobileview: "9807711987",
  whatsapp: "919807711987",
  whatsappview: "919807711987",
  email: "admission@yourschool.com",
  emailview: "admission@yourschool.com",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
  twitter: "https://www.twitter.com/",
  website: "https://ritiwebsolution.blogspot.com/",
  notice: "Admission Open from 1 Apr 2026 | 28 Aug Raksha Bandha Holiday",
  fee: "#"
};

const LINKS = {
  "site-call": () => "tel:" + SITE.mobile,
  "site-whatsapp": () => "https://wa.me/" + SITE.whatsapp,
  "site-email": () => "mailto:" + SITE.email,
  "site-facebook": () => SITE.facebook,
  "site-instagram": () => SITE.instagram,
  "site-youtube": () => SITE.youtube,
  "site-twitter": () => SITE.twitter,
  "site-admission": () => SITE.admission,
  "site-form": () => SITE.form,
  "site-fee": () => SITE.fee
};

Object.entries(LINKS).forEach(([cls, url]) => {
  document.querySelectorAll("." + cls)
    .forEach(el => el.href = url());
});

document.querySelectorAll(".site-mobileview")
  .forEach(el => el.textContent = SITE.mobileview);

document.querySelectorAll(".site-whatsappview")
  .forEach(el => el.textContent = SITE.whatsappview);

document.querySelectorAll(".site-emailview")
  .forEach(el => el.textContent = SITE.emailview);

document.querySelectorAll(".site-name")
  .forEach(el => el.textContent = SITE.name);

document.querySelectorAll(".site-website")
  .forEach(el => el.textContent = SITE.website);

document.querySelectorAll(".site-address")
  .forEach(el => el.textContent = SITE.address);

document.querySelectorAll(".site-notice")
  .forEach(el => el.textContent = SITE.notice);

document.querySelectorAll(".site-logo")
  .forEach(el => el.src = SITE.logo);
