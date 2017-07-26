/* @flow */
'use strict'
import componentFactory from './render'
declare var chrome: any

;(function (global, chrome, document) {
  class StateView {
    constructor (): void {
      global.addEventListener('load', evt => {
        this.render()
      })
    }
    render (): void {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { content: 'fetchCookie' }, response => {
          if (!response || !response.data) {
            throw new Error("couldn't recieve page data")
          }
          this.createVue(response.data)
        }
        )
      })
    }
    createVue (userData: object) {
      componentFactory(userData, vm => {
        vm.$set(vm.pageInfo, 'honya', 'morake')
      })
    }
    reverseActivation (): void {
      chrome.runtime.sendMessage({ bg: 'reverseActivation' }, response => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, { content: response.isActive }, response => {
            this.mount(response.data)
          }
          )
        })
      })
    }
  }
  return new StateView()
})(window, chrome, document)