export const concat = (text1: string, text2: string) => (`${text1}-${text2}`);

export const desconcat = (textConcat: string) => (textConcat.split('-')); 
