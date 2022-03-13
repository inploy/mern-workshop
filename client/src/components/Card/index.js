import dayjs from "../../utils/dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import request from "../../utils/request";
import { getUser } from "../../services/authorize";
import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-quill/dist/quill.snow.css";

const Card = ({ title, subTitle, updatedAt, slug, callback }) => {
  const navigate = useNavigate();
  const formatDate = dayjs().to(dayjs(updatedAt));

  const confirmDelete = async (slug) => {
    try {
      const res = await Swal.fire({
        title: "คุณต้องการลบบทความนี้ใช่ไหม?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok",
      });
      if (res.isConfirmed) {
        deleteBlog(slug);
      }
    } catch (err) {
      console.log({ err });
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  };

  const deleteBlog = async (slug) => {
    try {
      const res = await request.delete(`/blog/${slug}`);
      Swal.fire("แจ้งเตือน", res.data.message, "success");
      callback();
    } catch (err) {
      console.log({ err });
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  };

  return (
    <div className="card-columns">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5
              className="card-title"
              onClick={() => navigate(`/blog/${slug}`)}
            >
              {title}
            </h5>
            {getUser() && (
              <div>
                <i
                  className="bi bi-pencil-square me-2 edit-icon"
                  onClick={() => navigate(`/blog/${slug}/edit`)}
                ></i>
                <i
                  className="bi bi-trash3"
                  onClick={() => confirmDelete(slug)}
                ></i>
              </div>
            )}
          </div>
          <div className="card-content">
            <h6 class="text-muted card-text">{subTitle}</h6>
          </div>
          <small className="text-muted">Last updated {formatDate}</small>
        </div>
      </div>
    </div>
  );
};

export default Card;
