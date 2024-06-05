"use server";

import { convertStringToURL } from "./lib/routes";

// const username = "duped";
// const userpass = "WelkiN#ChavvI";
// const token = "655b1c2c1d4c4decbcba8c13116a21eada69da06e4c58186621df243580ea8119544dcb8a79f75c8de717f83664487da853b0bf1e85ece581f4f5a42e5deba8fe9925ea1bc3a4ac2e4429034b1"
// const login = "demo";
// const password = "8120b9bc25cd";
// const password = "demo12";
const token = process.env.TOKEN;
const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const url = "https://duped.wpenginepowered.com/wp-json/v1";
// const url = "https://tec-sense.co.in/projects/duped/wp-json/v1";

const credentials = `${login}:${password}`;
const encodedCredentials = btoa(credentials);
const headers = {
  // username: username,
  // userpass: userpass,
  Authorizationtoken: token,
  // "Authorization": `Basic ${encodedCredentials}`
}

export const getHeaders = async () => {
  return headers
}

export const getBasicAuthorization = async () => {
  return `Basic ${encodedCredentials}`
}

// const dynamic = 'force-dynamic';
const changeImgDomain = (imgUrl) => {
  return imgUrl.split("duped.wpenginepowered.com").join("tec-sense.co.in/projects/duped")
}

const retries = 3;
const backoff = 300;

let allProducts;
let tries = 0;

export const waitingFunction = async () => {
  console.log("try 1 :", new Date());
  if (tries === 0) await new Promise(res => setTimeout(res, 15000));
  tries += 1;
  console.log("try 2 :", new Date());
  let res = await fetchAllProducts();
  return res;
}

export const fetchAllProducts = async () => {
  for (let i = 0; i < retries; i++) {
    try {
      // console.log(i)
      const res = await fetch(`${url}/all-product`, {
        cache: "no-store",
        // cache: "force-cache",
        // next: { revalidate: 10 },
        headers: headers
      });
      const data = await res.json();
      let tempData = data.map((item) => {
        // item.image_url = changeImgDomain(item.image_url)
        item.urlName = convertStringToURL(item.name)
        return item
      })
      tempData = modifyDuplicateNames(tempData);
      allProducts = tempData;
      return tempData;
    } catch (err) {
      console.log("err ::", err);
      if (i === retries - 1) break;
      await new Promise(res => setTimeout(res, backoff * Math.pow(2, i)));
    }
  }
};

function modifyDuplicateNames(arr) {
  const nameCounts = {};
  arr.forEach(item => {
    const { urlName } = item;
    if (nameCounts[urlName] === undefined) {
      nameCounts[urlName] = 1;
    } else {
      // const count = nameCounts[urlName];
      // delete nameCounts[urlName];
      nameCounts[urlName]++;
      item.urlName = `${urlName}-${nameCounts[urlName] - 1}`;
    }
  });
  return arr;
}