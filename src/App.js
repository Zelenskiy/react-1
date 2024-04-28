import "./styles/App.css";

import { useState } from "react";
import PostList from "./components/PostList";

import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description 1" },
    { id: 2, title: "JavaScript", body: "Description 2" },
    { id: 3, title: "JavaScript", body: "Description 3" },
    { id: 4, title: "JavaScript", body: "Description 4" },
  ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title="Пости про JS" />
        : <h1 style={{textAlign: 'center'}}>Пости не знайдено</h1>
      }
      
    </div>
  );
}

export default App;
