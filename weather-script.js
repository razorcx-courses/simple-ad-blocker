console.log("**** Weather Clean-Up Script ****");

// Select all <div> elements that have a class containing "ad-leaderboard" or "div-gpt-ad-topbanner"
const adDivs = document.querySelectorAll(
  'div[class*="ad-"], div[class*="gpt-ad"], div[id*="ad-"], div[id*="gpt-ad"], div[id*="video_player"], div[id*="taboola-module"]'
);

// Log the found elements to the console
adDivs.forEach((div) => console.log(div));

adDivs.forEach((div) => {
  if (div.parentNode) {
    div.parentNode.removeChild(div);
  }
});

