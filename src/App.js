import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    // 다음 일기 Item은 숫자 증가
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  // 어느 Id를 갖고 있는 요소를 지우길 원하나 매개변수로 전달
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // DiaryItem의 부모인 DiaryList 컴포넌트에 props로 onDelete 함수를 내려준다
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} diaryList={data} />
    </div>
  );
}
export default App;
