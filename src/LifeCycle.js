import React, { useEffect, useState } from "react";

const LifeCylce = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 컴포넌트가 탄생하는 = mount 되는 시점
  // callback함수는 컴포넌트가 mount 되는 시점에만 작동
  // mount 시점에 무엇인가 하고 싶으면 useEffect의 두번째 인자인 []에 빈배열을 전달하고 callback함수에 하고 싶은 일 넣어주면 됨
  useEffect(() => {
    console.log("Mount!");
  }, []);

  //컴포넌트가 update되는 순간에 하고 싶은 일이 있으면 이런식으로 useEffect 이용
  useEffect(() => {
    console.log("Update!");
  });

  // dependecy array를 잘 활용하면 감지하고 싶은 값만 감지해서 그 값이 변화하는 순간에만 callback함수를 수행 시키게 할 수 있음
  // ex) count가 5 이상이 되면 alert이 나오고 1로 리셋됨
  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다 따라서 1로 초기화 합니다");
      setCount(1);
    }
  }, [count]);

  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default LifeCylce;
