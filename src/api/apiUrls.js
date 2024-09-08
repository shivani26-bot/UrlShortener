import supabase, { supabaseUrl } from "@/utils/supabase";

// fetch all the urls related to particular user
export async function getUrls(user_id) {
  // we can also use getUser to fetch latest detail of user data from database
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  console.log("urldata", data);
  return data;
}
export async function deleteUrl(id) {
  // we can also use getUser to fetch latest detail of user data from database
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);

  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qr-codes")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);
  const qr = `${supabaseUrl}/storage/v1/object/public/qr-codes/${fileName}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Error creating short URL");
  }

  return data;
}

// takes id of short url fetches long url from database and redirect it
export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  // match the id with either short_url or custom_url
  if (error) {
    console.error(error.message);
    throw new Error("Error fetching short link");
  }

  return data;
}

// info about the particular url and clicks for that url
// for link page
export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Short Url not found");
  }

  return data;
}
