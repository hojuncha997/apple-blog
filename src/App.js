import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let post = "강남 우xdd동 맛집";

  let [titles, setTitles] = useState([
    "다-남자 코트 추천1",
    "나-남자 코트 추천2",
    "가-남자 코트 추천3",
  ]);

  let [likes, setLikes] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false); //모달이 닫힌 상태가 기본

  function addLike(index) {
    // setLikes(likes + 1);
    console.log("index!:", index);
    setLikes((currentLikes) => {
      const newLikesArray = [...currentLikes];
      newLikesArray[index] += 1;
      return newLikesArray;
    });
  }

  function changeTitle() {
    let newTitleArray;
    setTitles((titles) => {
      newTitleArray = [...titles];
      newTitleArray[0] = "여자 코트 추천";
      return newTitleArray;
    });
  }

  // const sortTitle = () => {
  //   let newTitleArray = [...titles];
  //   console.log("newTitleArray", newTitleArray);
  //   newTitleArray.sort((a, b) => {
  //     if (a < b) {
  //       return -1;
  //     } else if (a > b) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   console.log("newTitleArray", newTitleArray);
  //   setTitles(newTitleArray);
  // };

  // const sortTitle = () => {
  //   // 비동기에서는 최신의 값을 가져오지 못할 가능성이 있음
  //   let newTitleArray = [...titles];
  //   newTitleArray.sort((a, b) => a.localeCompare(b));
  //   setTitles(newTitleArray);
  // };

  const sortTitle = () => {
    setTitles((currentTitles) => {
      let newTitleArray = [...currentTitles];
      newTitleArray.sort((a, b) => a.localeCompare(b));
      return newTitleArray;
    });
  };

  const openOrCloseModal = () => {
    modal == false ? setModal(true) : setModal(false);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>블로그임</h4>
      </div>

      {/* <div className="list">
        <h4>
          {titles[0]} <span onClick={addLike}>👍</span> {like}
        </h4>
        <button onClick={changeTitle}>타이틀 변경</button>
        <button onClick={sortTitle}>타이틀 정렬</button>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4>{titles[1]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4 onClick={openOrCloseModal}>{titles[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
      */}

      {titles.map((item, index) => {
        //param1: 요소, param2: 인덱스
        console.log(index);
        return (
          <div className="list" key={index}>
            <h4 onClick={openOrCloseModal}>
              {titles[index]}
              <span
                onClick={() => {
                  addLike(index);
                }}
              >
                👍
              </span>
              {likes[index]}
            </h4>
            <button onClick={changeTitle}>타이틀 변경</button>
            <button onClick={sortTitle}>타이틀 정렬</button>
            <p>2월 17일 발행</p>
          </div>
        );
      })}

      {modal == true ? (
        <Modal
          title={titles[0]}
          color={"skyblue"}
          handleChangeTitle={changeTitle}
        />
      ) : null}
    </div>
  );
}

// 모달 컴포넌트
function Modal(props) {
  const [title, color, handleChangeTitle] = [
    props.title,
    props.color,
    props.handleChangeTitle,
  ];
  return (
    <div className="modal" style={{ background: color }}>
      <h4>{title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={handleChangeTitle}>글 수정</button>
    </div>
  );
}

export default App;

// destructuring
// let [a, c] = [1, 2] --> a == 1, c == 2
// state를 쓰면 자동으로 재렌더링 된다. 변수는 안 된다(직접 변경 필요).
