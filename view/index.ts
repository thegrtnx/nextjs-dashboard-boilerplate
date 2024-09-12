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
import HomeView from "./dashboard/homeView";

//products
import CatalogueView from "./dashboard/product/catalogueView";

//skeletons
import TableSkeleton01 from "./skeletons/tableSkeletons01";

export { SignupView, VerifyView, SigninView, ForgotView, ResetPasswordView, AuthLayoutView, DashboardLayoutView, ProtectedRoute, HomeView, CatalogueView, TableSkeleton01 };
