import { getUser } from "./authStorage";

export const authHeader = () => {
    const currentUser = getUser();

    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
};
