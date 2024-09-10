"use client";
import SignupView from "./auth/signupView";
import VerifyView from "./auth/verifyView";
import SigninView from "./auth/signinView";
import ForgotView from "./auth/forgotView";
import ResetPasswordView from "./auth/resetPasswordView";
import { AuthLayoutView } from "./auth/authLayoutView";

//hoc
import ProtectedRoute from "./hoc";

//dashboard views
import { DashboardLayoutView } from "./dashboard/dashboardLayoutView";

export { SignupView, VerifyView, SigninView, ForgotView, ResetPasswordView, AuthLayoutView, DashboardLayoutView, ProtectedRoute };
