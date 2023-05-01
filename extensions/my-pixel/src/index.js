import {register} from '@shopify/web-pixels-extension';
register(async ({analytics, browser}) => {
  // subscribe to events
  analytics.subscribe('all_events', (event) => {
    console.log("PIXEL v3: EVENT", JSON.stringify(event));

    // test reading from window - does not work
    console.log("PIXEL v3: CHECK window.ff", typeof ff);

    // test sending beacon - does not work, blocked by AdBlock
    browser.sendBeacon('https://events-mgk72y5fqq-uc.a.run.app', JSON.stringify({
      "accountId": 1,
      "eventType": "campaign-link-clicked",
      "campaignId": "cmp1"
    }))

    // test posting message to parent window - does not work
    postMessage("PIXEL: EVENT WAS FIRED")

    // test reading from local storage - works
    console.log("PIXEL v3: local storage", browser.localStorage.getItem('gorgias.guest-id'));

    // test setting local storage - works
    browser.localStorage.setItem('gorgias.communication-channel', JSON.stringify({
      name: event.name,
      data: event.data,
    }))
    // execute localStorage.getItem('gorgias.communication-channel') in console to see the result
  });
});