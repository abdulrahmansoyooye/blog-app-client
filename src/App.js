import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PostPage from "./pages/PostPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
