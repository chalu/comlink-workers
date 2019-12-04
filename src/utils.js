export const getTimeFromCurrentDate = () => {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    return {hours, minutes, seconds, milliseconds};
};

const getNextTime = (uiElement) => {
    setTimeout(() => {
        requestAnimationFrame(showTime(uiElement));
    }, 1000);
};

export const showTime = (uiElement) => {
    return () => {
        const { hours, minutes, seconds } = getTimeFromCurrentDate();
        uiElement.textContent = `${hours}:${minutes}:${seconds}`;
        getNextTime(uiElement);
    };
};