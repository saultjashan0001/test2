import React from "react";

function PostList({ posts }) {
  if (!posts || posts.length === 0) return <p style={{ textAlign: "center", marginTop: "10px" }}>No posts yet.</p>;

  return (
    <div style={{ marginTop: "10px" }}>
      {posts.map((p) => (
        <div key={p.id} style={{ background: "#f9fafb", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
          <strong>{p.author}</strong>
          <p>{p.text}</p>
          {p.image && <img src={p.image} alt="post" style={{ maxWidth: "200px", marginTop: "5px", borderRadius: "6px" }} />}
        </div>
      ))}
    </div>
  );
}

export default PostList;
