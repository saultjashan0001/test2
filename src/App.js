import React, { useState, useEffect } from "react";
import DiscussionForm from "./DiscussionForm";
import DiscussionList from "./DiscussionList";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCodeInput, setVerificationCodeInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [pendingUser, setPendingUser] = useState("");

  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCodeInput, setResetCodeInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [resetGeneratedCode, setResetGeneratedCode] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedDiscussions = localStorage.getItem("discussions");
    if (savedUser) setUser(savedUser);
    if (savedDiscussions) {
      try {
        setDiscussions(JSON.parse(savedDiscussions));
      } catch (e) {
        console.warn("Failed parsing discussions from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    if (user) localStorage.setItem("user", user);
  }, [user]);

  // === Auth Logic ===
  const handleLoginSignup = () => {
    const username = usernameInput.trim();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!username) {
      alert("Please enter a username.");
      return;
    }

    if (isSignup) {
      if (users[username]) {
        alert("Username already exists.");
        return;
      }
      users[username] = { password: passwordInput, phone: "" };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful. Please log in.");
      setIsSignup(false);
      setUsernameInput("");
      setPasswordInput("");
      return;
    }

    if (!users[username]) {
      alert("User not found. Please sign up first.");
      return;
    }

    sendVerificationCode(username, users[username].phone || "");
  };

  const sendVerificationCode = (username, phone) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    setPendingUser(username);
    alert(`Verification code sent to +1 ${phone}\nCode: ${code}`);
    setIsVerifying(true);
    setVerificationCodeInput("");
  };

  const handleCodeVerify = () => {
    if (verificationCodeInput.trim() === generatedCode) {
      setUser(pendingUser);
      setPendingUser("");
      setIsVerifying(false);
      setUsernameInput("");
      setPasswordInput("");
    } else {
      alert("Incorrect code. Try again.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // === Discussions & Posts ===
  const addDiscussion = (title) => {
    const newDiscussion = {
      id: Date.now(),
      title,
      posts: [],
      likes: [],
      dislikes: [],
      createdBy: user,
    };
    setDiscussions((prev) => [...prev, newDiscussion]);
  };

  const deleteDiscussion = (id) => {
    if (!window.confirm("Delete this discussion?")) return;
    setDiscussions((prev) => {
      const next = prev.filter((d) => d.id !== id);
      setSelectedDiscussion((sd) => (sd?.id === id ? null : sd));
      return next;
    });
  };

  const addPost = (discussionId, text, image = null) => {
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id !== discussionId) return d;
        const newPost = {
          id: Date.now(),
          author: user || "Anonymous",
          text: text || "",
          image: image ?? null,
        };
        return { ...d, posts: [...d.posts, newPost] };
      })
    );
  };

  const likeDiscussion = (id) => {
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const likes = d.likes.includes(user) ? d.likes : [...d.likes, user];
        const dislikes = d.dislikes.filter((u) => u !== user);
        return { ...d, likes, dislikes };
      })
    );
  };

  const dislikeDiscussion = (id) => {
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const dislikes = d.dislikes.includes(user) ? d.dislikes : [...d.dislikes, user];
        const likes = d.likes.filter((u) => u !== user);
        return { ...d, likes, dislikes };
      })
    );
  };

  // === Render Screens ===
  if (isVerifying) {
    return (
      <div className="App auth-screen">
        <div className="login-card">
          <h2>Verify Account</h2>
          <p>Enter the 4-digit code sent to your phone/email.</p>
          <input
            type="text"
            value={verificationCodeInput}
            onChange={(e) => setVerificationCodeInput(e.target.value)}
            placeholder="4-digit code"
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleCodeVerify}>Verify</button>
            <button onClick={() => sendVerificationCode(pendingUser, "")} style={{ marginLeft: 8 }}>
              Resend Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isForgotPassword) {
    return (
      <div className="App auth-screen">
        <div className="login-card">
          <h2>Reset Password</h2>
          {!resetCodeSent ? (
            <>
              <input
                placeholder="Username"
                value={resetUsername}
                onChange={(e) => setResetUsername(e.target.value)}
              />
              <button
                onClick={() => {
                  const users = JSON.parse(localStorage.getItem("users") || "{}");
                  if (!users[resetUsername]) {
                    alert("User not found.");
                    return;
                  }
                  const code = Math.floor(1000 + Math.random() * 9000).toString();
                  setResetGeneratedCode(code);
                  alert(`Reset code sent. Code: ${code}`);
                  setResetCodeSent(true);
                }}
              >
                Send Reset Code
              </button>
            </>
          ) : (
            <>
              <input
                placeholder="Enter Code"
                value={resetCodeInput}
                onChange={(e) => setResetCodeInput(e.target.value)}
              />
              <input
                placeholder="New Password"
                type="password"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
              />
              <button
                onClick={() => {
                  const users = JSON.parse(localStorage.getItem("users") || "{}");
                  if (resetCodeInput !== resetGeneratedCode) {
                    alert("Incorrect code.");
                    return;
                  }
                  users[resetUsername].password = newPasswordInput;
                  localStorage.setItem("users", JSON.stringify(users));
                  alert("Password reset successfully.");
                  setIsForgotPassword(false);
                  setResetCodeSent(false);
                  setResetUsername("");
                }}
              >
                Reset Password
              </button>
            </>
          )}
          <p>
            <span className="toggle-auth" onClick={() => setIsForgotPassword(false)}>
              Back to Login
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="App auth-screen">
        <div className="login-card">
          <h1>Welcome to My Discussion Board</h1>
          <input
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button onClick={handleLoginSignup}>{isSignup ? "Sign Up" : "Login"}</button>
          <p className="toggle-text">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <span className="toggle-auth" onClick={() => setIsSignup(false)}>
                  Login
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span className="toggle-auth" onClick={() => setIsSignup(true)}>
                  Sign Up
                </span>
              </>
            )}
          </p>
          {!isSignup && (
            <p>
              <span className="toggle-auth" onClick={() => setIsForgotPassword(true)}>
                Forgot Password?
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }

  // === Main Discussion Board ===
  return (
    <div className="App">
      <div className="top-bar">
        <span>
          Logged in as <strong>{user}</strong>
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {!selectedDiscussion ? (
        <>
          <h1>Discussion Board</h1>
          <DiscussionForm addDiscussion={addDiscussion} />
          <DiscussionList
            discussions={discussions}
            selectDiscussion={setSelectedDiscussion}
            deleteDiscussion={deleteDiscussion}
            likeDiscussion={likeDiscussion}
            dislikeDiscussion={dislikeDiscussion}
          />
        </>
      ) : (
        <div>
          <h2>{selectedDiscussion.title}</h2>
          <button className="btn back" onClick={() => setSelectedDiscussion(null)}>
            ⬅ Back
          </button>
          <PostList posts={selectedDiscussion.posts} />
          <PostForm addPost={(text, image) => addPost(selectedDiscussion.id, text, image)} />
        </div>
      )}
    </div>
  );
}

export default App;
