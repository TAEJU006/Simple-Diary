import { useState } from "react";
// DiaryEditor 컴포넌트가 input에 작성된 값을 직접 핸들링 할 수 있도록 만든다

const DiaryEditor = () => {
  // 작성자의 초기값은 입력을 안한 상태 이므로 공백("") 넣어줌

  const [state, setState] = useState({
    author: "",
    content: "",
    // select로 선택한 값을 실시간으로 DiaryEditior 컴포넌트가 핸들링 히기 위해서 emotion이라는 프로퍼티 생성
    emotion: 1,
  });

  //이벤트 객체를 받는다는것 = input의 onChange, textarea의 onChange에도 전달
  const handleChangeState = (e) => {
    // author:변경된 내용, content:변경된 내용
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장 성공");
  };

  // css에 클래스 가지고 스타일링을 할때 클래스 이름과 컴포넌트 이름 일치시키면 직관적으로 코드 작성 가능
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          //event가 발생한 target element에 이름까지 출력 가능
          name="author"
          value={state.author}
          // onChange : 값이 바뀌었을때 수행 하는 이벤트 => onChange 이벤트를 input에 등록하면 input이 변화할때마다 callback 함수를 작동
          // input에 값이 바뀌었을때 onChange라는 prop에 전달한 callback함수를 수행
          onChange={handleChangeState}
          // 상태를 값이 변화할때마다 그 값으로 업데이트

          // 알아서 spread가 펼쳐주기 때문에 원래의 값을 객체에 할당하는게 가능
        />
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}

          // 알아서 spread가 펼쳐주기 때문에 원래의 값을 객체에 할당하는게 가능
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
