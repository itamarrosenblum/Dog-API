/* -------------------------------
Purpose: Main JS File
Version: 0.2
Author: Itamar Rosenblum
Date: 10-01-21
Last Update: 11-01-21
------------------------------- */

// Function 1: Fetch all breeds function
(async function bringBreed() {
  // Get elements
  const galleryContainer = document.querySelector("#gallery-container");
  const select = document.querySelector("#select");
  const selectSub = document.querySelector("#select-sub");
  // Create primary option element
  select.innerHTML = `<option disabled hidden selected>Select a Breed</option>`;
  selectSub.innerHTML = `<option disabled hidden selected>Select a Sub Breed</option>`;

  try {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();

    // Create new breed option element based on the fetch data
    for (let key in data.message) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.innerHTML = key;
      select.appendChild(opt);
    }
  } catch (err) {
    console.error(err);
  }

  // Funtcion 2: Fetch all SUB breeds function
  select.addEventListener("change", async () => {
    // Catch value of selected breed option
    const selectValue = select.value;

    // Reset the sub select element
    selectSub.innerHTML = "";
    // Create primary option element
    selectSub.innerHTML = `<option disabled hidden selected>Select a Sub Breed</option>`;

    try { // catch is in line 67
      const res = await fetch(`https://dog.ceo/api/breed/${selectValue}/list`);
      const data = await res.json();
      // Create new SUB breed option based on the fetch data
      for (let i = 0; i < data.message.length; i++) {
        const optSub = document.createElement("option");
        optSub.value = data.message[i];
        optSub.innerHTML = data.message[i];
        selectSub.appendChild(optSub);
      }

      // Display image when sub breed is zero
      if (data.message.length === 0) {
        try {
          // catch is in line 79
          const res = await fetch(`https://dog.ceo/api/breed/${selectValue}/images/random`);
          const data = await res.json();
          galleryContainer.innerHTML = `<img src="${data.message}" alt="${selectValue}">`;
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) { // try is in line 44
      console.error(err);
    }
  }); // end of event lisitner select

  // Function 3: Display image only when clicking on SUB breed option
  selectSub.addEventListener("change", async () => {
    // Catch value of selected breed option
    const selectValue = select.value;
    // Catch value of selected SUB breed option
    const subValue = selectSub.value;
    // Reset galleryContainer
    galleryContainer.innerHTML = "";
    
    try {
      // Get element
      const res = await fetch(`https://dog.ceo/api/breed/${selectValue}/${subValue}/images/random/10`);
      const data = await res.json();

      for (let i = 0; i < data.message.length; i++) {
        let img = document.createElement("img");
        img.setAttribute("src", data.message[i]);
        img.setAttribute("alt", subValue);
        galleryContainer.appendChild(img);
      }
    } catch (err) {
      console.error(err);
    }
  }); // end of event lisitner selectSub
})(); // end of main funtion bringBreed
