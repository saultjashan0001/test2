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
  const [phoneInput, setPhoneInput] = useState("");
  const [verificationCodeInput, setVerificationCodeInput] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [pendingUser, setPendingUser] = useState("");

  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  // Forgot Password:
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetPhone, setResetPhone] = useState("");
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCodeInput, setResetCodeInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [resetGeneratedCode, setResetGeneratedCode] = useState("");

  useEffect(() => {
    const savedDiscussions = localStorage.getItem("discussions");
    const savedUser = localStorage.getItem("user");
    if (savedDiscussions) setDiscussions(JSON.parse(savedDiscussions));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    if (user) localStorage.setItem("user", user);
  }, [user]);

  const handleLoginSignup = () => {
    const username = usernameInput.trim();
    const password = passwordInput.trim();
    const phone = phoneInput.trim();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
// sign up
    if (isSignup) {
      if (!username || !password || !phone) {
        alert("Please fill in all signup fields.");
        return;
      }
      if (users[username]) {
        alert("Username already exists.");
        return;
      }
      users[username] = { password, phone };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful. Please log in.");
      setIsSignup(false);
      setUsernameInput("");
      setPasswordInput("");
      setPhoneInput("");
      return;
    }

    // Login part
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    if (!users[username] || users[username].password !== password) {
      alert("Invalid credentials.");
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    setPendingUser(username);
    alert(`Verification code sent to +1 ${users[username].phone}\nCode: ${code}`);
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
    setUser(null);
    localStorage.removeItem("user");
  };

  const addDiscussion = (title) => {
    const newDiscussion = {
      id: Date.now(),
      title,
      posts: [],
      createdBy: user,
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  const addPost = (discussionId, text) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              posts: [...d.posts, { id: Date.now(), text, author: user }],
            }
          : d
      )
    );
  };

  
  if (isVerifying) {
    return (
      <div className="App">
        <h1>Verify Your Login</h1>
        <div className="login-box">
          <input
            type="text"
            placeholder="Enter 4-digit code"
            value={verificationCodeInput}
            onChange={(e) => setVerificationCodeInput(e.target.value)}
          />
          <button onClick={handleCodeVerify}>Verify Code</button>
        </div>
      </div>
    );
  }

  //Forgot Password screen
  if (isForgotPassword) {
    return (
      <div className="App">
        <h1>Reset Your Password</h1>
        <div className="login-box">
          {!resetCodeSent ? (
            <>
              <input
                type="text"
                placeholder="Enter your username"
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
                  setResetPhone(users[resetUsername].phone);
                  alert(`Reset code sent to +1 ${users[resetUsername].phone}\nCode: ${code}`);
                  setResetCodeSent(true);
                }}
              >
                Send Reset Code
              </button>
              <p>
                Remembered your password?{" "}
                <button className="toggle-auth" onClick={() => setIsForgotPassword(false)}>
                  Go back
                </button>
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter reset code"
                value={resetCodeInput}
                onChange={(e) => setResetCodeInput(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter new password"
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
                  setResetCodeInput("");
                  setNewPasswordInput("");
                  setResetUsername("");
                }}
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

 
  if (!user) {
    return (
      <div className="App">
        <h1>{isSignup ? "Sign Up" : "Welcome to the Discussion Board"}</h1>
        <div className="login-box">
          <input
            type="text"
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
          {isSignup && (
            <input
              type="text"
              placeholder="Phone (e.g. 4161234567)"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
          )}
          <button onClick={handleLoginSignup}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {!isSignup && (
            <p>
              <button
                className="toggle-auth"
                onClick={() => {
                  setIsForgotPassword(true);
                  setUsernameInput("");
                  setPasswordInput("");
                }}
              >
                Forgot Password?
              </button>
            </p>
          )}

          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="toggle-auth"
              onClick={() => {
                setIsSignup(!isSignup);
                setUsernameInput("");
                setPasswordInput("");
                setPhoneInput("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // === Main Discussion Board ===
  return (
    <div className="App">
      <div className="top-bar">
        <span>Logged in as <strong>{user}</strong></span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <h1>Discussion Board</h1>

      {!selectedDiscussion ? (
        <>
          <DiscussionForm addDiscussion={addDiscussion} />
          <DiscussionList
            discussions={discussions}
            selectDiscussion={setSelectedDiscussion}
          />
        </>
      ) : (
        <div>
          <h2>{selectedDiscussion.title}</h2>
          <button className="back-button" onClick={() => setSelectedDiscussion(null)}>⬅ Back</button>
          <PostList posts={selectedDiscussion.posts} />
          <PostForm addPost={(text) => addPost(selectedDiscussion.id, text)} />
        </div>
      )}
    </div>
  );
}

export default App;
await fetch("http://localhost:3000/send-code", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phone: "+17425883970" }), // no +1, we add it in backend
});
await fetch("http://localhost:3000/verify-code", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phone: "+17425883970",  }),
});

