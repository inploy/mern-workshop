import NavBar from "../components/Navbar/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
// import renderHTML from "react-render-html";
// import ReactHtmlParser from "react-html-parser";

function Home() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div class="row row-cols-1 row-cols-sm-2  g-3 g-lg-4 my-4">
          {blogs.map((item, index) => (
            <Card {...item} key={index} callback={fetchData} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
