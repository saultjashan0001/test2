import React from "react";

function DiscussionList({ discussions, selectDiscussion }) {
  if (discussions.length === 0) {
    return <p>No discussions yet. Start one!</p>;
  }

  return (
    <div>
      <h3>Discussions</h3>
      <ul>
        {discussions.map((d) => (
          <li key={d.id}>
            <button onClick={() => selectDiscussion(d)}>{d.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiscussionList;
