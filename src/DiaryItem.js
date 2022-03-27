import { useRef, useState } from "react";

const DiaryItem = ({
  onRemove,
  onEdit,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  // true와 false 값을 갖게 되는데 현재 수정중인지 아닌지 boolean 상태로 값을 보관
  const [isEdit, setIsEdit] = useState(false);
  // toggleIsEdit이 호출되는 순간 원래 가지고 있던 값을 반전 시킨다
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // localContent의 원래 값을 content로 변경해주면 기존 내용을 수정 가능
  const [localContent, setLocalContent] = useState(content);
  // 조건을 만족 하지 않으면 진하게 테두리가 보여서 수정이 안되게 하는 HTML DOM에 접근할 Ref 만들어줌
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };
  // 수정 취소를 누르고 다시 원래 글로 돌아간 후 다시 수정 취소를 누르면 입력된 값이 나오는데 false로 줘서 원래의 값이 나오게 함
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // 수정 완료가 되면 처리할 함수
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
          // isEdit 함수가 true이기 때문에 textarea가 나옴
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
