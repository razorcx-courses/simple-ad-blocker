//https://www.semrush.com/blog/most-visited-websites/

chrome.cookies.onChanged.addListener((changeInfo) => {
  console.log("**** COOKIE CHANGE ****", changeInfo);

  if (!changeInfo.removed) {
    chrome.cookies.remove({
      url: "http://" + changeInfo.cookie.domain + changeInfo.cookie.path,
      name: changeInfo.cookie.name,
    });
  }
});

const getTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  return tab;
};

chrome.action.onClicked.addListener(async (tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [tab],
    func: (tab) => {
      console.log("**** Extension Clicked ****", tab.id);
    },
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [tab],
    func: (tab) => {
      // console.log("**** Tab Updated ****", tab.id);
      console.log("**** AD Clean-Up Script ****");

      const adDivs = document.querySelectorAll(
        'div[class*="ad-wrapper"], div[id*="ad-wrapper"], div[class*="glacier-ad"], div[class*="video_player"], div[class*="ad-slot"], div[class*="container__ads"], div[class*="stack__ads"], div[class*="adSlug"], div[class*="display-ads-container"]'
      );

      // Log the found elements to the console
      adDivs.forEach((div) => console.log(div));

      adDivs.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });

      // Get all <div> elements in the document
      const divs = document.querySelectorAll("div");

      // Filter <div> elements that have inner text "advertisement"
      const adDivs2 = Array.from(divs).filter(
        (div) => div.innerText.trim() === "Advertisement"
      );

      // Do something with the filtered <div> elements
      adDivs2.forEach((div) => {
        console.log(div); // For example, log each matching <div> to the console
      });

      adDivs2.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });
    },
  });
});
