'use strict';
(function (chrome, document, json) {
  class StateView {
    constructor () {
      this.updateState();
    }
    getCookieState (tabId) {
      chrome.tabs.sendMessage(tabId, {pass: 'get'}, (response) => {
        console.log(response);
        if (!response || !response.status) {
          return;
        }
        this.appendState(response.status);
      });
    }
    appendState (status) {
      const data = status.split(',');
      for (const i in data) {
        const info = data[i].split(':');
        const statusDom = document.getElementsByTagName('info');
        statusDom.setAttribute(info[0], info[1]);
      }
    }
    updateState () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        this.getCookieState(tabs[0].id);
      });
    }
  }

  /* eslint no-new: 1 */
  new StateView();
})(chrome, document, JSON);
