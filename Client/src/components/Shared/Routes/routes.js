const privateRoutes = [
  {
    path: "/",
    exact: true,
    loader: () => import("../../ChatPage"),
    menu: false,
    label: "Trang chủ",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/m/:userId/",
    exact: true,
    loader: () => import("../../ChatPage/index"),
  },
  {
    path: "/user/:userId/update-password",
    exact: true,
    loader: () => import("../../UserPage/Form/UpdatePassword"),
    menu: false,
    label: "Trang chủ",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/user/:userId/update",
    exact: true,
    loader: () => import("../../UserPage/Form/FormPage"),
    menu: false,
    label: "Trang chủ",
    permissionRequired: null,
    icon: "home",
  },
  /* 

  {
    path: "/call",
    exact: true,
    loader: () => import("./CallPage/index"),
  }, */
];

const publicRoutes = [];

const errorRoutes = [
  {
    path: "/401",
    exact: true,
    loader: () => import("../error/Error401Page"),
  },
  {
    path: "/403",
    exact: true,
    loader: () => import("../error/Error403Page"),
  },
  {
    path: "/404",
    exact: true,
    loader: () => import("../error/Error404Page"),
  },
  {
    path: "/500",
    exact: true,
    loader: () => import("../error/Error500Page"),
  },
];

const authRoutes = [
  {
    path: "/signin",
    exact: true,
    loader: () => import("../../AuthPage/SigninPage/index"),
  },
  {
    path: "/signup",
    exact: true,
    loader: () => import("../../AuthPage/SignupPage/index"),
  },
  {
    path: "/password-reset",
    exact: true,
    loader: () => import("../../AuthPage/SendResetPasswordPage"),
  },
  {
    path: "/new-password",
    exact: true,
    loader: () => import("../../AuthPage/ChangePasswordPage"),
  },
  {
    path: "/verify-email",
    exact: true,
    loader: () => import("../../AuthPage/VerifyEmailPage"),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  authRoutes,
  errorRoutes,
};
