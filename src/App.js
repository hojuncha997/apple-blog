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

  let [like, setLike] = useState(0);

  function addLike() {
    console.log(1);
    // setLike(like + 1);
    setLike((prevState) => prevState + 1);
  }

  function changeTitle() {
    let index;
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

  const sortTitle = () => {
    setTitles((currentTitles) => {
      let newTitleArray = [...currentTitles];
      newTitleArray.sort((a, b) => a.localeCompare(b));
      return newTitleArray;
    });
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>블로그임</h4>
      </div>

      <div className="list">
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
        <h4>{titles[2]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </div>
  );
}

export default App;

// destructuring
// let [a, c] = [1, 2] --> a == 1, c == 2
// state를 쓰면 자동으로 재렌더링 된다. 변수는 안 된다(직접 변경 필요).
