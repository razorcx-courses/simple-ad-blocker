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
        'div[class*="ad-wrapper"], div[id*="ad-wrapper"], div[class*="ad-full"], div[class*="consumption-page-rail-wrapper"], div[class*="banner-ad"], div[class*="privacy-policy"], div[id*="adobe-analytics"], div[id*="leaderboard-wrap"], div[id*="leaderboard"], div[id*="adchoicesBtn"], div[id*="zdcFloatingBtn"], div[class*="AdsWrapper"], div[class*="HeaderAds"], div[class*="glacier-ad"], div[class*="video_player"], div[class*="ad--container"], div[class*="ad__slot"], div[class*="ad-slot"], div[class*="container__ads"], div[class*="dmg-ads"], div[class*="stack__ads"], div[class*="adSlug"], div[class*="display-ads-container"], div[class*="ads-container"], div[class*="billboard-container"]'
      );

      adDivs.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });

      const adDivs3 = document.querySelectorAll(
        'div[class*="railBelow_c2"], div[id*="ad-wrapper"], div[class*="intra-article-module"], div[slot*="intraArticleModule"]'
      );

      adDivs3.forEach((div) => {
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

      //msn
      const displayAdsElements = document.getElementsByTagName("display-ads");

      // Loop through the found elements
      for (let element of displayAdsElements) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }

      const blockAdsElements =
        document.getElementsByTagName("above-river-block");

      // Loop through the found elements
      for (let element of blockAdsElements) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }

      const divSlots = document.querySelectorAll(
        'div[slot*="intraArticleModule"]'
      );

      divSlots.forEach((div) => {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });

      setTimeout(() => {
        // Step 1: Find all <div> elements with class 'ad-label'
        const adLabelDivs = document.querySelectorAll("div.ad-label");

        // Step 2: Traverse up to find the highest-level parent <div>s
        const highestLevelDivs = new Set(); // Use a Set to ensure uniqueness

        adLabelDivs.forEach((div) => {
          console.log("@@@@@@@@@@", div);
          let currentElement = div;
          while (currentElement.parentElement) {
            // Keep going up until you find the highest-level parent <div>
            if (currentElement.parentElement.tagName.toLowerCase() === "div") {
              currentElement = currentElement.parentElement;
            } else {
              break; // Stop if the parent is not a <div>
            }
          }
          // Add the highest-level parent <div> to the set
          highestLevelDivs.add(currentElement);
        });

        // Step 3: Do something with the highest-level parent <div>s
        highestLevelDivs.forEach((div) => {
          console.log(div); // Example action: log each to the console
        });
      }, 6000);
    },
  });
});
