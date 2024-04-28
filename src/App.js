import "./styles/App.css";
import { useEffect, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";

import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const [filter, setFilter] = useState({sort: '', query: ''})
  const sortedAndSeachedPosts = usePosts(posts, filter.sort, filter.query)

  async function fetchPosts() {
    const posts = await PostService.getAll()
    setPosts(posts);
  }

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
