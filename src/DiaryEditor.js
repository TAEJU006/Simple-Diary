import React, { useRef, useState } from "react";

const DiaryEditor = () => {
  // useRef 함수를 호출해 반환값을 authorInput에 담아줌
  // authorInput은 MutableRefObject인데 html dom 요소에 접근할 수 있는 기능을 함
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      // focus
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      // focus
      contentInput.current.focus();
      return;
    }
    alert("저장 성공");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          // authorInput이라는 객체를 통해서input 태그에 접근 가능
          // userRef로 생성한 authorInput같은 레퍼런스 객체는 현재 가르키는 값을 current라는 프로퍼티로 불러와 사용할 수 있음
          // authorInput.current는 authorInput 태그가 되는거고 focus라는 기능을 사용해 focus 되도록 만든것
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default DiaryEditor;
