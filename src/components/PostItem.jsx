import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props, remove) => {
  return (
    <div className="post">
      <div>
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>

      <div>
        <MyButton onClick={() => props.remove(props.post)} >Вилучити</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
