// This code listens for any changes to cookies. If a cookie is added (not removed), it attempts to remove the cookie immediately. Note that this approach has limitations:

// It reacts after cookies are set, which might not fully prevent the cookie's initial use.
// It might remove cookies you want to keep. You would need to add more logic to selectively remove cookies.
// For a more sophisticated approach that might allow blocking cookies before they are set, you would typically need to intercept and modify HTTP headers. However, the capabilities of chrome.webRequest in Manifest V3 are restricted compared to Manifest V2, particularly regarding request modification.

// Please remember to read the official Chrome extension documentation for the latest APIs and capabilities, as this field evolves rapidly, and new functionalities are introduced over time.

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

      // Select all <div> elements that have a class containing "ad-leaderboard" or "div-gpt-ad-topbanner"
      const adDivs = document.querySelectorAll(
        'div[class*="ad-wrapper"], div[id*="ad-wrapper"]'
      );

      // Log the found elements to the console
      adDivs.forEach((div) => console.log(div));

      adDivs.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });
    },
  });
});
