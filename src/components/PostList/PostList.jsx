import React from 'react';
import PostItem from "../PostItem/PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = (props) => {

  if(!props.posts.length) {
    return <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Список постов</h1>
      <TransitionGroup>
        {
          props.posts.map((post, i) =>
            <CSSTransition
              timeout={150}
              classNames='post'
              key={post.id}
            >
              <PostItem
                number={i}
                post={post}
                remove={props.remove}
              />
            </CSSTransition>

          )
        }
      </TransitionGroup>

    </div>
  );
}

export default PostList;