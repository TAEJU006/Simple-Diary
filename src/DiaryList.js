import DiaryItem from "./DiaryItem";

// 자신의 부모로부터(App 컴포넌트) onDelete를 받았음
const DiaryList = ({ onRemove, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          // DiaryItem에게 onDelete를 내려줌
          <DiaryItem key={`diaryitem_${it.id}`} {...it} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
