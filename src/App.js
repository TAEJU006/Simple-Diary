import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // async 함수를 붙여서 getData 함수가 promise를 반환하는 비동기 함수로 만들어 줌
  // then을 이용해 우리가 원하는 json 값들만 뽑아와 줌
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    // 응답값 배열 res(객체가 들어있는 배열)에서  0~19까지 slice
    // map함수를 사용하면 배열의 각각 모든 요소를 순회 하여 map함수의 callback함수 안에서 return 하는 값들을 모아서 배열을 만들어서 initData값에 집어 넣는다
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        // math.random 0~4까지의 random 숫자를 산출
        // math.floor은 소수점 자리수를 정수로 바꿔주는 함수 => math.random함수는 소수점까지 산출되기 때문에
        // +1을 하면 1부터 5까지 산출 가능
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  // mount
  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}
export default App;
