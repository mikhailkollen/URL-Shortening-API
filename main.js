// Burger Menu and Header selectors
const toggleBtn = document.querySelector(".toggle-btn");
const btnContainer = document.querySelector(".toggle-btn-container");
const navLinks = document.querySelector(".nav-links");
const bodyFrame = document.querySelector("body");
const navLinksOpened = document.querySelector(".nav-open");
const backgroundColor = document.querySelector(".background-color");
const footer = document.querySelector("footer");
const navLoginSignBtnsContainer = document.querySelector(".nav-item-nav-btns");

// const overlay = document.querySelector(".overlay-div");

// input selectors
const input = document.getElementById("url");
const form = document.querySelector(".form");
const url = "https://api.shrtco.de/v2/shorten?url=";
const linksContainer = document.querySelector(".short-links-container");

const listOfLinks = [];
var backgroundColorHeight = backgroundColor.style.height;

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
        // backgroundColor.style.height = `${bodyFrame.offsetHeight}px`;
        backgroundColor.style.height = `${Math.floor(
          footer.getBoundingClientRect().top - form.getBoundingClientRect().top
        )}px`;
        backgroundColor.classList.add("full-link-viewed");
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
  console.log(bodyFrame.offsetHeight);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shortenLink(input.value);
  if (backgroundColor.classList.contains("full-link-viewed")) {
    backgroundColor.style.height = `${Math.floor(
      window.innerHeight + 95 * listOfLinks.length
    )}px`;
    backgroundColor.classList.remove("full-link-viewed");
  } else {
    backgroundColor.style.height = `${Math.floor(
      footer.getBoundingClientRect().top - form.getBoundingClientRect().top
    )}px`;
  }
  console.log(backgroundColor.style.height);
});

// To Close the Burger Menu when the window is resized
window.addEventListener("resize", () => {
  navLinks.classList.remove("transform-animation");
  navLinks.classList.remove("nav-open");
  // overlay.classList.remove("overlay");
  toggleBtn.classList.remove("close-btn");
  navLoginSignBtnsContainer.innerHTML = "";
  backgroundColor.style.height = `${Math.floor(
    footer.getBoundingClientRect().top - form.getBoundingClientRect().top
  )}px`;
});

// To Close/Open the Burger Menu
toggleBtn.addEventListener("click", () => {
  navLinks.classList.add("transform-animation");
  navLinks.classList.toggle("nav-open");
  toggleBtn.classList.toggle("close-btn");
  navLoginSignBtnsContainer.innerHTML = `<div class="nav-btns-container" id="nav-btns-container-mobile">
            <a href="#" class="nav-item nav-btn">Login</a>
            <button type="button" class="nav-item elliptic-btn sign-up-btn">
              Sign Up
            </button>
        </div>`;
  // overlay.classList.toggle("overlay");
});

// To Close the Burger Menu when clicked outside
// overlay.addEventListener("click", (e) => {
//   navLinks.classList.remove("nav-open");
//   overlay.classList.remove("overlay");
//   toggleBtn.classList.toggle("close-btn");
// });
