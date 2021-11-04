import React, {useEffect, useRef, useState} from 'react'
import PostList from "./../components/PostList/PostList";
import PostForm from "./../components/PostForm/PostForm";
import PostFilter from "./../components/PostFilter/PostFilter";
import MyModal from "./../components/UI/MyModal/MyModal";
import MyButton from "./../components/UI/MyButton/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "./../API/PostService";
import Loader from "./../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "./../components/UI/Pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/MySelect/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCountPosts, setTotalCountPosts] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const lastElement = useRef();

  const [fetchPosts, isLoadingPosts, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    const totalCountPosts = response.headers['x-total-count']

    setPosts([...posts, ...response.data])
    setTotalCountPosts(totalCountPosts)
    setTotalPages(getPageCount(totalCountPosts, limit))
  })

  useObserver(lastElement, page<totalPages, isLoadingPosts, ()=>{
    setPage(page + 1)
  })


  useEffect(() => {
    fetchPosts()
  }, [page])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton
        style={{margin: '15px 0'}}
        onClick={() => setModal(true)}
      >
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={e => setLimit(e.target.value)}
        defaultValue={'Кол-во постов на странице'}
        options ={[
          {value: 5, title: '5'},
          {value: 10, title: '10'},
          {value: 25, title: '25'},
          {value: totalCountPosts, title: 'Показать все'},
        ]}
      />
      {
        postError &&
        <h1 style={{textAlign: 'center'}}>{postError}</h1>
      }
      <PostList posts={sortedAndSearchedPosts} remove={removePost}/>
      <div ref={lastElement} style={{height: '1px', backgroundColor: '#000', visibility: 'hidden'}}/>
      {
        isLoadingPosts && <Loader/>
      }
    </div>
  );
}

export default Posts;