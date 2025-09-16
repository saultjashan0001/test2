import React from "react";

function DiscussionList({ discussions, selectDiscussion, deleteDiscussion, likeDiscussion, dislikeDiscussion }) {
  return (
    <div>
      {discussions.map((d) => (
        <div key={d.id} style={{ padding: "15px", marginBottom: "10px", background: "#f1f5f9", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong onClick={() => selectDiscussion(d)} style={{ cursor: "pointer" }}>{d.title}</strong>
            <button onClick={() => deleteDiscussion(d.id)} style={{ cursor: "pointer", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "5px 10px" }}>Delete</button>
          </div>

          <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
            <button onClick={() => likeDiscussion(d.id)}>👍 Like ({d.likes.length})</button>
            <button onClick={() => dislikeDiscussion(d.id)}>👎 Dislike ({d.dislikes.length})</button>
          </div>

          {d.likes.length > 0 && (
            <div style={{ marginTop: "5px", fontSize: "0.9em", color: "#2563eb" }}>
              Liked by: {d.likes.join(", ")}
            </div>
          )}
          {d.dislikes.length > 0 && (
            <div style={{ marginTop: "2px", fontSize: "0.9em", color: "#ef4444" }}>
              Disliked by: {d.dislikes.join(", ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DiscussionList;
