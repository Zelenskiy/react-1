import "./styles/App.css";

import { useState, useMemo } from "react";
import PostList from "./components/PostList";

import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

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
  const [searchQuery, setSearchQuery] = useState('')


  const sortedPosts = useMemo(() => {
    console.log(11222);
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    } else {
      return posts
    }
  }, [selectedSort, posts])

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    
  }

  const sortedAndSeachedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedPosts])

  // const setSearchQuery = (e) => {
  //   console.log();
  // }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margine: '15px 0'}}/>
      <div>
        <MyInput 
          placeholder='Search...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}

        />
        <MySelect 
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='Сортування'
        options={[
          {value: 'title', name: 'По назві'},
          {value: 'body', name: 'По опису'},
      ]}
      />
      </div>
      
      {sortedAndSeachedPosts.length !== 0
        ? <PostList remove={removePost} posts={sortedAndSeachedPosts} title="Пости про JS" />
        : <h1 style={{textAlign: 'center'}}>Пости не знайдено</h1>
      }
      
    </div>
  );
}

export default App;
