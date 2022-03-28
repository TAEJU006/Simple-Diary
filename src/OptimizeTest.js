import React, { useState, useEffect } from "react";

// TextView prop은 text가 바뀌지 않으면 절대로 렌더링이 일어나지 않는다
const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`update :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect = () => {
    console.log(`update :: Count : ${count}`);
  };
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <h2>text</h2>
      <TextView text={text} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default OptimizeTest;
