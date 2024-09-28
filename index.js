const axios = require("axios");
const fs = require("fs");
let counter = 0;

// Save the interval ID
const intervalId = setInterval(async () => {
  console.log("Checking URL:", counter);
  const first_part = "https://panels.art/images/13-p-500.webp";
  //   const url = `${first_part}${counter}.webp`;
  const url = `https://panels.art/images/${counter}-p-500.webp`;
  try {
    const response = await axios.head(url); // Use HEAD request to check headers only

    // Get the content type from the response headers
    const contentType = response.headers["content-type"];

    // Check if the content type indicates an image
    if (contentType && contentType.startsWith("image/")) {
      console.log("The URL points to an image.", url);

      // Append the URL to the txt file
      fs.appendFileSync("found_urls.txt", `${url}\n`, "utf8");
    } else {
      console.log(
        "The URL does not point to an image, it's likely a code or other resource."
      );
    }
  } catch (error) {
    console.error("Error checking the URL:", error.message);
  }

  counter += 1;

  // Stop the interval if counter exceeds 10000
  if (counter > 10000) {
    clearInterval(intervalId); // Pass the interval ID to stop it
    console.log("Interval stopped.");
  }
}, 1000);
