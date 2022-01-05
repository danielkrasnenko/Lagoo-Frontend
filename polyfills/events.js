if (!document.eAddEventListener) {
  const fn = document.addEventListener;
  document.eAddEventListener = (type, listener, options) => {
    fn.call(document, type, listener, options);
  };
}

if (!document.eRemoveEventListener) {
  const fn = document.removeEventListener;
  document.eRemoveEventListener = (type, listener, options) => {
    fn.call(document, type, listener, options);
  };
}

if (!window.eAddEventListener) {
  const fn = window.addEventListener;
  window.eAddEventListener = (type, listener, options) => {
    fn.call(window, type, listener, options);
  };
}

if (!window.eRemoveEventListener) {
  const fn = window.removeEventListener;
  window.eRemoveEventListener = (type, listener, options) => {
    fn.call(window, type, listener, options);
  };
}

if (!HTMLElement.prototype.eAddEventListener) {
  const fn = HTMLElement.prototype.addEventListener;
  HTMLElement.prototype.eAddEventListener = function (type, listener, options) {
    fn.call(this, type, listener, options);
  };
}

if (!HTMLElement.prototype.eRemoveEventListener) {
  const fn = HTMLElement.prototype.removeEventListener;
  HTMLElement.prototype.eRemoveEventListener = function (type, listener, options) {
    fn.call(this, type, listener, options);
  };
}
