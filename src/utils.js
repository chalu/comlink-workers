/**
 * Utils module.
 * @module Utils
 */

const getTimeFromCurrentDate = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  return { hours, minutes, seconds, milliseconds };
};

/**
 * provides a time display function for system time
 * @param {object} uiElement DOM node to display system time
 * @returns {function} the function to invoke to render system time
 */
export const getTimer = uiElement => {
  let next;
  const ui = uiElement;

  const timer = () => {
    if (!ui) return;

    const { hours, minutes, seconds } = getTimeFromCurrentDate();
    ui.textContent = `${hours}:${minutes}:${seconds}`;
    next();
  };

  next = () => {
    setTimeout(() => {
      requestAnimationFrame(timer);
    }, 1000);
  };

  return timer;
};

/**
 * constantly estimate and display the page's frame rate on the provided UI elemtnt
 * @param {object} uiElement DOM node to display frame rate
 * @returns {function} the function to invoke and monitor frame rate
 */
export const getFPSMonitor = uiElement => {
  const times = [];
  const ui = uiElement;

  const monitor = () => {
    requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);

      // const frames = times.length > 60 ? 60 : times.length;
      ui.textContent = `~${times.length} fps`;

      monitor(ui);
    });
  };
  return monitor;
};
