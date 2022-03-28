import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`counterA update - count:${count}`);
  });

  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`counterB update - count:${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

// areEqual => React.memo의 비교함수로 작용
const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
  // return prevProps.obj.count === nextProps.obj.count; 라고 식을 작성해도 정상적으로 작동 한다
  // return true // 이전 props = 현재 props -> rerendering을 일으키지 않는다
  // return false // 이전 props \= 현재 props -> rerendering을 일으키라는 뜻이다
};

// CounterB는 areEqual 함수에 따라서 rerendering을 할지 말지를 결정
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
