export const getTimeFromCurrentDate = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  return { hours, minutes, seconds, milliseconds };
};

const getNextTime = uiElement => {
  setTimeout(() => {
    requestAnimationFrame(showTime(uiElement));
  }, 1000);
};

export const showTime = uiElement => {
  return () => {
    const ui = uiElement;
    if (!ui) return;

    const { hours, minutes, seconds } = getTimeFromCurrentDate();
    ui.textContent = `${hours}:${minutes}:${seconds}`;
    getNextTime(uiElement);
  };
};

// adapted from https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
export const getFPSMonitor = () => {
  const times = [];
  const monitor = uiElement => {
    const ui = uiElement;
    requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);

      // const frames = times.length > 60 ? 60 : times.length;
      ui.textContent = `${times.length} FPS`;

      monitor(ui);
    });
  };
  return monitor;
};
