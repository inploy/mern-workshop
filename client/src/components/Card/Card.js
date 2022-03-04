import dayjs from "../../utils/dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import { getUser } from "../../services/authorize";
import "bootstrap-icons/font/bootstrap-icons.css";

const Card = ({ title, author, content, updatedAt, slug, callback }) => {
  const navigate = useNavigate();
  const formatDate = dayjs().to(dayjs(updatedAt));

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBlog(slug);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        Swal.fire("Deleted!", res.data.message, "success");
        callback();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="card-columns">
      <div className="card">
        <div className="card-body" onClick={() => navigate(`/blog/${slug}`)}>
          <div class="d-flex justify-content-between">
            <h5 className="card-title">{title}</h5>
            {getUser() && (
              <div>
                <i
                  class="bi bi-pencil-square me-2"
                  onClick={() => navigate(`/edit/blog/${slug}`)}
                ></i>
                <i class="bi bi-trash3" onClick={() => confirmDelete(slug)}></i>
              </div>
            )}
          </div>

          <p className="card-text">{content}</p>
          <small className="text-muted">Last updated {formatDate}</small>
        </div>
      </div>
    </div>
  );
};

export default Card;
