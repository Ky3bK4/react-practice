import React from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MySelect from "../UI/MySelect/MySelect";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput
        value = {filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder = "Поиск"
      />
      <MySelect
        value={filter.sort}
        onChange={e => setFilter({...filter, sort: e.target.value})}
        defaultValue="Сортировка"
        options={[
          {title: 'По названию', value: 'title'},
          {title: 'По описанию', value: 'body'}
        ]}
      />
    </div>
  );
};

export default PostFilter;