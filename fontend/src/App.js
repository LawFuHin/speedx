import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Secret from "./Components/Secret";
import Post from "./Components/Post";
import Items from "./Components/Items";
import RequireAuth from "./Components/RequireAuth";
import Navbar from "./Components/Navbar";
import ShowResult from "./pages/ShowResult";
import Item from "./pages/Item";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Profile from "./pages/Profile";
import Test from "./Components/Test";
import Edit from "./pages/Edit";
import "bootstrap/dist/css/bootstrap.min.css";
import Message from "./pages/Message";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route
            path="/search/:selectedCategory/:searchInput"
            element={<SearchResult />}
          />

          <Route path="/showresult/:queryName" element={<ShowResult />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/message" element={<Message />} />
          <Route path="/home" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/items/:itemID" element={<Item />} />
          <Route path="/edit/:itemID" element={<Edit />} />
          <Route
            path="/post"
            element={
              <RequireAuth>
                <Post />
              </RequireAuth>
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/secret"
            element={
              <RequireAuth>
                <Secret />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
