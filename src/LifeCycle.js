import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount!");

    return () => {
      // unmount 시점에 실행
      console.log("unmount!");
    };
  }, []);

  return <div>Unmount Testing component</div>;
};

const LifeCylce = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
    // isVisible이 true면 UnmountTest가 반환이 되어 렌더링 되고, false이면 UnmountTest 렌더링 안된다
    // 단락회로평가를 이용하면 값이 true, false인지를 통해서 뒤에 있는 컴포넌트를 렌더 할지 말지 쉽게 결정 할 수 있다
  );
};

export default LifeCylce;
