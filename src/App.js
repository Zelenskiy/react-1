import "./styles/App.css";
import { useEffect, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";

import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";

function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false)

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    console.log('333333333');
    const posts = await PostService.getAll()
    setPosts(posts);
  })

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
      {postError &&
        <h1>Is Error ${postError}</h1>
      }
      {isPostLoading
        ?<Loader/>
        :<PostList remove={removePost} posts={sortedAndSeachedPosts} title="Пости про JS" />
      }
      
    </div>
  );
}

export default App;
