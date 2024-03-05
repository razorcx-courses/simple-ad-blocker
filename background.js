//https://www.semrush.com/blog/most-visited-websites/

chrome.cookies.onChanged.addListener((changeInfo) => {
  if (!changeInfo.removed) {
    chrome.cookies.remove({
      url: "http://" + changeInfo.cookie.domain + changeInfo.cookie.path,
      name: changeInfo.cookie.name,
    });
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [tab],
    func: (tab) => {
      const adDivs = document.querySelectorAll(
        'div[class*="ad-wrapper"], div[id*="ad-wrapper"], div[id*="adobe-analytics"], div[id*="leaderboard-wrap"], div[id*="leaderboard"], div[id*="adchoicesBtn"], div[id*="zdcFloatingBtn"], div[class*="AdsWrapper"], div[class*="HeaderAds"], div[class*="glacier-ad"], div[class*="video_player"], div[class*="ad--container"], div[class*="ad__slot"], div[class*="ad-slot"], div[class*="container__ads"], div[class*="dmg-ads"], div[class*="stack__ads"], div[class*="adSlug"], div[class*="display-ads-container"], div[class*="ads-container"], div[class*="billboard-container"]'
      );

      adDivs.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });

      const divs = document.querySelectorAll("div");

      const adDivs2 = Array.from(divs).filter(
        (div) => div.innerText.trim() === "Advertisement"
      );

      adDivs2.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });
    },
  });
});
