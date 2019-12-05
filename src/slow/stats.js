const countChars = (payload) => {
    const { text } = payload;
};

export const analyzeText = (text = '') => {
    if(text.trim() === '') return;

    console.log(text);
};