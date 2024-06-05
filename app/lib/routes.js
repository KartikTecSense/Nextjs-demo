export const client_routes = {
  home: "/",
  allDupes: "/shop",
  ourStory: "/our-story",
  contactUs: "/contact-us",
  shop: "/shop",
  dupesAvailableId: "/dupes-available/",
  productName: "/product/",
  productCategoryId: "/product-category/",
  productTagId: "/product-tag/",
  termsConditions: "/terms-conditions",
  blogs: "/blogs",
  blogId: "/blogs/",
}

const specialCharsRegex = /[’!@#$%^&*()_+\-–=︲\[\]{};':"\\|,.<>\/? ]+/;

export const convertStringToURL = (name) => {
  let tempName = name.split("™").join("-tm-")
  let value = tempName.split(specialCharsRegex).join("-").toLowerCase()
  return value
}