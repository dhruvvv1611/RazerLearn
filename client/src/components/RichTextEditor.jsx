import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const quillRef = useRef(null); // Use a ref to manage the ReactQuill instance

  const handleChange = (value) => {
    setInput({ ...input, description: value });
  };

  return (
    <ReactQuill
      ref={quillRef} // Attach the ref
      theme="snow"
      value={input.description}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
