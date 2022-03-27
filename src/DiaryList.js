import DiaryItem from "./DiaryItem";

// // 다이어리 요소의 하나하나가 it으로 바뀌어서 들어온다 = dummydata에 넣은 객체 하나하나가 들어온다
// it이라는 객체에 포함된 모든 데이터 DiaryItem에 prop으로 전달
const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>
      <div>
        {diaryList.map(
          (
            it // 다이어리 요소의 하나하나가 it으로 바뀌어서 들어온다 = dummydata에 넣은 객체 하나하나가 들어온다
          ) => (
            // it이라는 객체에 포함된 모든 데이터 DiaryItem에 prop으로 전달
            <DiaryItem key={`diaryitem_${it.id}`} {...it} />
          )
        )}
      </div>
    </div>
  );
};

// undefined로 전달될거 같은 값들을 기본값으로 설정
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
