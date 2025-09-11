import React, { useState } from "react";

function PostForm({ addPost }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Post cannot be empty!");
      return;
    }
    addPost(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write your reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;
