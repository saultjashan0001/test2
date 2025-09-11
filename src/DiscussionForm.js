import React, { useState } from "react";

function DiscussionForm({ addDiscussion }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Discussion title cannot be empty!");
      return;
    }
    addDiscussion(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter discussion title..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Discussion</button>
    </form>
  );
}

export default DiscussionForm;
