import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostPage = () => {
  const params = useParams();

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const [fetchingById, isLoading, error] = useFetching(async (id)=>{
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  const [fetchingComments, isComLoading, comError] = useFetching(async (id)=>{
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(()=>{
    fetchingById(params.id)
    fetchingComments(params.id)
  }, [])

  return (
    <div>
      {
        isLoading
          ? <Loader />
          : <div>
            Пост c ID - {post.id}
            <div>
            {post.body}
            </div>
          </div>
      }
      <div style={{marginTop: '20px'}}>
        <h2>Комментарии</h2>
        {
          isComLoading
          ? <Loader />
          : <div>
              {comments.map((comment=>
              <div key={comment.id} style={{marginTop: '15px'}}>
                <b>{comment.email}</b>
                <p>{comment.body}</p>
              </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
};

export default PostPage;