This project was primarily developed by me. I independently wrote most of the application logic, including the authentication flow, local storage handling, discussion/post management, and UI rendering using React.
I used AI tools like Copilot selectively to help troubleshoot bugs, handle error messages, and resolve specific implementation issues. All major decisions, structure, and logic were created and implemented by me.
This project reflects my own understanding and effort, with AI assistance used only as a support tool for learning and debugging.

here is my main file codes that i modified:
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
rest of them you can see in the files.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
