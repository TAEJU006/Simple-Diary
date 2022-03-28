import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// reducer를 사용하는 이유는 복잡한 컴포넌트 로직을 컴포넌트 밖으로 분리하기 위해서이기 때문에 App 컴포넌트 밖에 작성
// reducer가 리턴하는 값이 새로운 상태 값이 된다
const reducer = (state, action) => {
  // reducer함수는 두개의 파라미터를 받는다 => 첫번째로 받는 파라미터는 상태변화가 일어나기 직전에 state, 두번째로 받는 파라미터는 어떤 상태변화를 일으켜야 하는지에 대한 정보들이 담겨져 있는 action 객체
  switch (action.type) {
    case "INIT": {
      // dispatch를 일으켰을때 타입을 INIT이라고 전달하면서 어떤 데이터로 초기화 할것이냐를 지칭하는 data 프로퍼티에 initData를 넣어놨기 때문에
      // reducer에서 받았을땐 action 객체에서 data 프로퍼티를 꺼내서 그 값을 리턴 해 주면 새로운 state가 된다
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      // ...action.data => oncreate 함수를 수정하면서 전달했었던 data들
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    // action으로 targetId와 newContent가 전달
    // 기존 state에서 map 함수를 사용해 해당 id와 일치하는 요소들을 찾아준 다음 그 요소의 값은 content만 newContent로 수정을 해주고 나머지 요소는 그대로 돌려준다
    // 그 요소들을 합쳐서 새로운 배열을 만들어서 새로운 state로 보내주어서 수행
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    // switch case에는 반드시 default case를 입력해 줘야 함
    // default일때는 상태를 전달하지 않도록 state를 그대로 전달 값이 안 바뀜
    default:
      return state;
  }
};

function App() {
  // const [data, setData] = useState([]);

  // useReducer에는 기본적으로 두개의 인자는 꼭 전달해야 한다=> 첫번째는 상태변화를 처리할 함수인 reducer, 두번째 인자는 datastate의 초기값을 전달
  // dispatch를 호출하면 reducer가 실행되고 reducer가 리턴하는 값이 data의 값이 된다
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    // reducer은 action 객체를 받는데 action의 타입이 INIT이고 action에 필요한 data는 initData가 된다
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 갯수 : {goodCount}</div>
      <div>기분 나쁜 일기 갯수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}
export default App;
