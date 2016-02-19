'use strict';

(function (root, chrome, localStorage) {
  class Background {
    constructor () {
      this.assignEventHandlers();
    }
    assignEventHandlers () {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.config) {
          case 'get':
            sendResponse({
              'id': this.get('USERDIVEId'),
              'host': this.get('USERDIVEHost'),
              'env': this.get('USERDIVEEnv')
            });
            break;
          case 'status':
            this.updateBadge(request.statusText);
            break;
        }
      });
      chrome.tabs.onActivated.addListener((response) => {
        this.updateBadge({text: ''});
      });
    }
    updateBadge (statusText) {
      switch (statusText) {
        case 'ok':
          chrome.browserAction.setBadgeBackgroundColor({color: '#42b812'});
          chrome.browserAction.setBadgeText({'text': statusText});
          break;
        case 'used':
          chrome.browserAction.setBadgeBackgroundColor({color: '#1a3fdb'});
          chrome.browserAction.setBadgeText({'text': statusText});
          break;
        case 'err':
          chrome.browserAction.setBadgeBackgroundColor({color: '#d60915'});
          chrome.browserAction.setBadgeText({'text': statusText});
          break;
        default:
          chrome.browserAction.setBadgeText({'text': ''});
      }
    }
    get (key) {
      let value = localStorage[key];
      if (value) {
        return value;
      }
      return '';
    }
    set (key, value) {
      localStorage[key] = value;
    }
  }

  root.bg = new Background();
})(window, chrome, localStorage);