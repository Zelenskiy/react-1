import "./styles/App.css";
import { useState, useMemo } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "ddfdf", body: "xcxc 1" },
    { id: 2, title: "gfffg", body: "ffdfd 2" },
    { id: 3, title: "xcxccx", body: "ttr 3" },
    { id: 4, title: "3rre", body: "fdgdfg 4" },
  ]);
  const [modal, setModal] = useState(false)


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const [filter, setFilter] = useState({sort: '', query: ''})


  const sortedPosts = useMemo(() => {
    console.log(11222);
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    } else {
      return posts
    }
  }, [filter.sort, posts])


  const sortedAndSeachedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Add post
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
      <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margine: '15px 0'}}/>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSeachedPosts} title="Пости про JS" />
    </div>
  );
}

export default App;
