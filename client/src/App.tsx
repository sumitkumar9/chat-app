import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";


import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));


const App = () => {

  const dispatch = useAppDispatch();
  const { user, loader } = useAppSelector((state) => state.auth)

  useEffect(() => {
    axios.get(`${server}/api/v1/user/me`, {
      withCredentials: true,
    })
    .then((res) => dispatch(userExists(res.data)))
    .catch(() => dispatch(userNotExists()))
  }, [dispatch])
  console.log("user", user);

  if (loader) return <LayoutLoader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<ProtectRoute/>}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Route>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
};

export default App;
