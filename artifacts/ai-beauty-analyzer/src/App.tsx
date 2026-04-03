import { Route, Switch } from "wouter";
import { Toaster } from "sonner";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Report from "./pages/Report";
import Routine from "./pages/Routine";
import Products from "./pages/Products";
import Progress from "./pages/Progress";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

export default function App() {
  return (
    <>
      <Toaster position="top-center" theme="dark" />
      <Switch>
        <Route path="/" component={Onboarding} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/scan" component={Scan} />
        <Route path="/report/:scanId" component={Report} />
        <Route path="/routine" component={Routine} />
        <Route path="/products" component={Products} />
        <Route path="/progress" component={Progress} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/profile" component={Profile} />
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400">Page not found</p>
          </div>
        </Route>
      </Switch>
    </>
  );
}
