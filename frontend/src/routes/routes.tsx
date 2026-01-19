import SignInPage from "../pages/auth/sign-in";
import SignUpPage from "../pages/auth/sign-up";
import ChatsPage from "../pages/chats";
import SingleChatPage from "../pages/chats/single-chat";

export const AUTH_ROUTES = {
  SIGN_IN: "/",
  SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  CHATS: "/chats",
  SINGLE_CHAT: "/chats/:chatId",
};

export const authRoutePaths = [
  {
    path: AUTH_ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: AUTH_ROUTES.SIGN_UP,
    element: <SignUpPage />,
  },
];

export const protectedRoutePaths = [
  {
    path: PROTECTED_ROUTES.CHATS,
    element: <ChatsPage />,
  },
  {
    path: PROTECTED_ROUTES.SINGLE_CHAT,
    element: <SingleChatPage />,
  },
];
