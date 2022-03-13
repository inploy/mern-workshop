import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const BlogForm = (props) => {
  const { values, onChange, onSubmit, buttonText, header } = props;

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

  const { title, subTitle, author, content } = values;

  return (
    <>
      <h1 className="my-4">{header}</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>
            <span className="text-danger">*</span>ชื่อบทความ
          </label>
          <input
            name="title"
            className="form-control"
            value={title}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="form-group">
          <label>
            <span className="text-danger">*</span>คำอธิบายบทความ
          </label>
          <input
            name="subTitle"
            className="form-control"
            value={subTitle}
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
          <label>
            <span className="text-danger">*</span>รายละเอียด
          </label>
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
