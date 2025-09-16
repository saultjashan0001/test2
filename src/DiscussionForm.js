import React, { useState } from "react";

function DiscussionForm({ addDiscussion }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addDiscussion(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Enter discussion title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%", padding: "10px", borderRadius: "6px", border: "1.5px solid #94a3b8", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "10px 15px", borderRadius: "6px", cursor: "pointer" }}>Add Discussion</button>
    </form>
  );
}

export default DiscussionForm;
