export async function GetDomainName(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        const url = new URL(tab.url);
        resolve(url.hostname);
      } else {
        resolve(null);
      }
    });
  });
}
