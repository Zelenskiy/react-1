import "./styles/App.css";

import { useState } from "react";
import PostList from "./components/PostList";

import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "ddfdf", body: "xcxc 1" },
    { id: 2, title: "gfffg", body: "ffdfd 2" },
    { id: 3, title: "xcxccx", body: "ttr 3" },
    { id: 4, title: "3rre", body: "fdgdfg 4" },
  ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const [selectedSort, setSelectedSort] = useState('')

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    console.log(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margine: '15px 0'}}/>
      <MySelect 
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='Сортування'
        options={[
          {value: 'title', name: 'По назві'},
          {value: 'body', name: 'По опису'},
      ]}
      />
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title="Пости про JS" />
        : <h1 style={{textAlign: 'center'}}>Пости не знайдено</h1>
      }
      
    </div>
  );
}

export default App;
