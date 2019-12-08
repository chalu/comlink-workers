export const getTimeFromCurrentDate = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  return { hours, minutes, seconds, milliseconds };
};

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

// adapted from https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
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
