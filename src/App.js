import React, {useEffect, useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import PostFilter from "./components/PostFilter/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/MyButton/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  async function fetchPosts() {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res=>res.data)
    setPosts(posts)
  }

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

  return (
    <div className="App">
      <MyButton
        style={{margin: '15px 0'}}
        onClick={()=>setModal(true)}
      >
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr  style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />
         <PostList posts={sortedAndSearchedPosts} remove={removePost}/>
    </div>
  );
}

export default App;
