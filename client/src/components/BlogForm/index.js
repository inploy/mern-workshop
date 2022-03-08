import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogForm = (props) => {
  const { values, onChange, onSubmit, buttonText } = props;

  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleContentOnChange = (value) => {
    onChange("content", value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const { title, author, content } = values;

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            name="title"
            className="form-control"
            value={title}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="form-group">
          <label>ผู้แต่ง</label>
          <input
            name="author"
            className="form-control"
            value={author}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <ReactQuill
            theme="snow"
            placeholder="input your content"
            value={content}
            onChange={handleContentOnChange}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default BlogForm;
