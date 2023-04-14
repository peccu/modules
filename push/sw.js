export const push = (event) => {
  if (!self.Notification || self.Notification.permission !== "granted") {
    return;
  }
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const { title, body, path } = data;
  //openpath = path;
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      // body: JSON.stringify(data),
      // body: `${self.location.origin}${path}`,
      tag: `${self.location.origin}${path}`,
      data: { url: `${self.location.origin}${path}` },
    })
  );
};

// from https://developer.mozilla.org/en-US/docs/Web/API/Clients/openWindow
export const notificationclick = (event) => {
  // const { url } = await event.notification.data;
  // https://developer.apple.com/forums/thread/726793?answerId=750619022#750619022
  const url = event.notification.tag;
  // const url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
    // clients.matchAll({ type: "window" }).then((clientsArr) => {
    //   // If a Window tab matching the targeted URL already exists, focus that;
    //   const hadWindowToFocus = clientsArr.some((windowClient) =>
    //     windowClient.url === url
    //       ? (windowClient.focus(), true)
    //       : false
    //   );
    //   // Otherwise, open a new tab to the applicable URL and focus it.
    //   if (!hadWindowToFocus)
    //     clients
    //       .openWindow(url)
    //       .then((windowClient) => (windowClient ? windowClient.focus() : null));
    // })
  );
};
