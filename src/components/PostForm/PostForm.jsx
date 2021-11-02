import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";

const PostForm = (props) => {
  const [post, setPost] = useState({title:'', body: ''})

  const addNewPost = (e) => {
    e.preventDefault();

    if(post.title.length > 0) {
      const newPost = {...post, id: Date.now()}

      props.create(newPost)
      setPost({title: '', body: ''})
    }
  }
    return (
      <form>
        <MyInput
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type="text"
          placeholder="Описание поста"
        />
        <MyButton
          onClick={addNewPost}
        >Создать пост
        </MyButton>
      </form>
    )
  }
;

export default PostForm;