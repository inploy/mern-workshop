import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import Card from "../components/Card";
import Load from "../components/Load";
import request from "../utils/request";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await request.get("/blogs");
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Load loading={loading}>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2  g-3 g-lg-4 my-4">
          {blogs.map((item, index) => (
            <Card {...item} key={index} callback={fetchData} />
          ))}
        </div>
      </div>
    </Load>
  );
}

export default Home;
