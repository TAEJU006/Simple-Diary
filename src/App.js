import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "김태주",
    content: "하이 1",
    emotion: 1,
    // 현재 시간을 기준으로 생성
    created_date: new Date().getTime(),
  },

  {
    id: 2,
    author: "김길동",
    content: "하이 2",
    emotion: 3,
    // 현재 시간을 기준으로 생성
    created_date: new Date().getTime(),
  },

  {
    id: 3,
    author: "홍길동",
    content: "하이 3",
    emotion: 1,
    // 현재 시간을 기준으로 생성
    created_date: new Date().getTime(),
  },
];

// dummydata를 DiaryList에diaryList라는 이름의 prop으로 전달
function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
