// import { push, notificationclick } from "./sw.js";
import { push,notificationclick} from "https://cdn.jsdelivr.net/gh/peccu/modules@master/push/sw.js";
self.addEventListener("push", push);

self.addEventListener("notificationclick", notificationclick);

self.addEventListener("fetch", () => {});
