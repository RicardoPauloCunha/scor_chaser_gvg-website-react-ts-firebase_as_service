import { concat, desconcat } from './formatString';

const USER_LOGGED_KEY = "@scor-chaser-guild:user-logged";
const CONCLUDED_PAGE_KEY = "@scor-chaser-guild:concluded-page";

export const setUserLogged = (userType: string, uidGuild: string) => {
    localStorage.setItem(USER_LOGGED_KEY, JSON.stringify(concat(userType, uidGuild)));
}

export const getUserLogged = () => {
    let data = localStorage.getItem(USER_LOGGED_KEY)

    if (data != null) {
        return desconcat(JSON.parse(data));
    }

    return "";
};

export const removeUserLogged = () => {
    localStorage.removeItem(USER_LOGGED_KEY);
}

export const setConcludedPage = (concludedId: number) => {
    localStorage.setItem(CONCLUDED_PAGE_KEY, JSON.stringify(concludedId));
}

export const getConcludedPage = () => {
    let data = localStorage.getItem(CONCLUDED_PAGE_KEY);
    
    if (data != null) {
        return JSON.parse(data);
    }
}

export const removeConcludedPage = () => {
    localStorage.removeItem(CONCLUDED_PAGE_KEY);
}