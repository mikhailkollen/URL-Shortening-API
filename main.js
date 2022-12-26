// Burger Menu and Header selectors
const toggleBtn = document.querySelector(".toggle-btn");
const btnContainer = document.querySelector(".toggle-btn-container");
const navLinks = document.querySelector(".nav-links");
const bodyFrame = document.querySelector("body");
const navLinksOpened = document.querySelector(".nav-open");
// const overlay = document.querySelector(".overlay-div");

// input selectors
const input = document.getElementById("url");
const form = document.querySelector(".form");
const url = "https://api.shrtco.de/v2/shorten?url=";
const linksContainer = document.querySelector(".short-links-container");

const listOfLinks = [];

const shortenLink = async (value) => {
  try {
    const response = await fetch(url + value);
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error("there was an error");
    }
    const data = await response.json();
    console.log(data.result.full_short_link2);
    let longLink = value;
    if (longLink.length > 30) {
      longLink = `${value.substring(0, 80)}...
        <button class="show-more-btn elliptic-btn">View full link</button>`;
    }
    if (listOfLinks.length > 2) {
      listOfLinks.pop();
    }
    listOfLinks.unshift(`
                <div class="shortened">
          <h2 class="long-link">${longLink}</h2>
          <div class="short-link"><h2  value="${data.result.full_short_link2}" id="test">${data.result.full_short_link2}</h2>
            <button class="copy-btn elliptic-btn" onclick="copyLink(this)" value="hello">Copy</button>
          </div>
        </div>
        
`);

    linksContainer.innerHTML = listOfLinks.join("");
    const showMoreBtns = document.querySelectorAll(".show-more-btn");
    showMoreBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.parentNode.textContent = value;
      });
    });
  } catch (error) {
    console.log("Something went wrong :(");
  }
};

const copyLink = (element) => {
  navigator.clipboard.writeText(element.parentNode.firstChild.textContent);
  element.classList.add("copy-btn-clicked");
  element.textContent = "Copied!";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shortenLink(input.value);
});

// To Close the Burger Menu when the window is resized
window.addEventListener("resize", () => {
  navLinks.classList.remove("transform-animation");
  navLinks.classList.remove("nav-open");
  // overlay.classList.remove("overlay");
  toggleBtn.classList.remove("close-btn");
});

// To Close/Open the Burger Menu
toggleBtn.addEventListener("click", () => {
  navLinks.classList.add("transform-animation");
  navLinks.classList.toggle("nav-open");
  toggleBtn.classList.toggle("close-btn");
  // overlay.classList.toggle("overlay");
});

// To Close the Burger Menu when clicked outside
// overlay.addEventListener("click", (e) => {
//   navLinks.classList.remove("nav-open");
//   overlay.classList.remove("overlay");
//   toggleBtn.classList.toggle("close-btn");
// });
