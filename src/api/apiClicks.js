import supabase from "@/utils/supabase";
import { UAParser } from "ua-parser-js";

// it takes array of urls ids
export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    // console.error(error.message);
    // throw new Error("Unable to load clicks");
    console.error("Error fetching clicks:", error);
    return null;
  }
  console.log("urlclicks", data);
  return data;
}

// once found the original url we store the stats for the particular user
// npm i ua-parser-js
const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    // getresult is function to get the info about the users's device
    const res = parser.getResult();
    const device = res.type || "desktop";
    // to determine the location of the user
    // https://ipapi.co/json
    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();
    // insert inside the supabase table
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });
    // route the user to original url
    window.location.href = originalUrl;
    console.log("Stats stored successfully");
    return true;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load stats");
  }

  return data;
}
