const adDivs = document.querySelectorAll(
  'div[class*="ad-"], div[class*="gpt-ad"], div[class*="glacier-ad"], div[class*="video_player"], div[id*="ad-"], div[id*="gpt-ad"], div[id*="video_player"], div[id*="taboola-module"]'
);

adDivs.forEach((div) => {
  if (div.parentNode) {
    div.parentNode.removeChild(div);
  }
});
