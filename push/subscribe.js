import { urlBase64ToUint8Array } from "./urlBase64ToUint8Array.js";

const ask = () => {
  return new Promise((resolve, reject) => {
    // Triggers popup to request access to send notifications
    window.Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          resolve();
        } else {
          reject(permission);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

const subscribe = (sw, pubkey) => {
  return new Promise((resolve, reject) => {
    const option = {
      applicationServerKey: urlBase64ToUint8Array(`${pubkey}`),
      userVisibleOnly: true,
    };
    // alert("option: " + JSON.stringify(option));
    sw.pushManager
      .subscribe(option)
      .then((subscription) => {
        // alert("sub", JSON.stringify(subscription));
        resolve(subscription);
      })
      .catch((e) => {
        // alert("sub e", e);
        reject(e);
      });
  });
};

export const askSubscribe = (sw, pubkey) => {
  return new Promise(async (resolve, reject) => {
    try {
      // alert("ask");
      await ask();
    } catch {
      alert(
        "Push Notification is not allowed in current setting. Please review it in Settings and allow it."
      );
      reject(
        "Push Notification is not allowed in current setting. Please review it in Settings and allow it."
      );
    }
    try {
      // alert("subscribe");
      const subscription = await subscribe(sw, pubkey);
      resolve(subscription);
    } catch (e) {
      reject(e);
    }
  });
};
