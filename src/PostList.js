import React from "react";

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>No posts yet. Be the first to reply!</p>;
  }

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          <div>
            <p>{p.text}</p>
            {p.author && <small>— {p.author}</small>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
