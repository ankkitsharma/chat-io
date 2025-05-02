import Env from "./env";

export const APP_URL = Env.APP_URL;
export const API_URL = APP_URL + "/apiv1";
export const LOGIN_URL = API_URL + "/auth/login";
export const CHAT_GROUP_URL = API_URL + "/chat-group";
export const CHAT_GROUP_USERS_URL = API_URL + "/chat-group-users";
export const CHATS_URL = API_URL + "/chats";
