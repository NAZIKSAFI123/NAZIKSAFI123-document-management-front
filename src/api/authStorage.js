// authStorage.js

const USER_KEY = "currentUser";

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};
