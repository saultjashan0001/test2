import React, { useState } from "react";

function PostForm({ addPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    addPost(text, image);
    setText("");
    setImage(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "15px", textAlign: "center" }}>
      <textarea
        placeholder="Write a post..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "70%", padding: "10px", borderRadius: "6px", border: "1.5px solid #94a3b8", marginBottom: "10px" }}
      />
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "10px" }} />
      </div>
      {image && <img src={image} alt="preview" style={{ maxWidth: "150px", marginBottom: "10px", borderRadius: "6px" }} />}
      <div>
        <button type="submit" style={{ padding: "10px 15px", borderRadius: "6px", cursor: "pointer" }}>Add Post</button>
      </div>
    </form>
  );
}

export default PostForm;
