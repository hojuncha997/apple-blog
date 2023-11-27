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
  let [titleIndex, setTitleIndex] = useState(2);
  let [inputValue, setInputValue] = useState("");

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
    setTitles((currentTitles) => {
      newTitleArray = [...currentTitles];
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

  const openOrCloseModal = (index) => {
    console.log("index in openClose", index);
    modal == false ? setModal(true) : setModal(false);
  };

  const createPosting = () => {
    setTitles((currentTitles) => {
      let newTitleArray = [...currentTitles];
      // newTitleArray.push(inputValue); 배열 맨 뒤에 추가
      newTitleArray.unshift(inputValue); //맨 앞에 추가
      return newTitleArray;
    });
    setInputValue("");
  };

  const deletePosting = (index) => {
    console.log(index);
    setTitles((currentTitles) => {
      let newTitleArray = [...currentTitles];
      // newTitleArray.pop(); 맨 뒤의 녀석만 제거
      // index 위치에서 1개의 요소를 제거
      newTitleArray.splice(index, 1);
      return newTitleArray;
    });
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

        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                openOrCloseModal();
                setTitleIndex(() => {
                  return index;
                });
              }}
            >
              {titles[index]}
              {/* span태그를 누르면, h4, div태그까지 이벤트 버블링이 발생한다.
              따라서 모달창이 열리게 된다. 이를 막기 위해 이벤트 객체를 사용한다.
              e.stopPropagation
              */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); //이벤트 버블링 방지
                  addLike(index);
                }}
              >
                👍
              </span>
              {/* {likes[index]} 이벤트 버블링 때문에 주석처리.
              따로 컴포넌트로 만들거나 아래처럼 태그로 감싼 뒤 
              프로퍼게이션 방지처리.*/}
              <span onClick={(e) => e.stopPropagation()}>{likes[index]}</span>
            </h4>
            <button onClick={changeTitle}>타이틀 변경</button>
            <button onClick={sortTitle}>타이틀 정렬</button>
            <button
              onClick={() => {
                deletePosting(index);
              }}
            >
              삭제
            </button>
            <p>2월 17일 발행</p>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            // e: event 객체.
            // 이벤트가 발생한 html 태그에 입력한 값
            setInputValue(e.target.value);
            console.log("inputValue", inputValue);
          }}
        ></input>
        <button onClick={createPosting}>저장</button>
      </div>

      {modal == true ? (
        <Modal
          titles={titles}
          color={"skyblue"}
          handleChangeTitle={changeTitle}
          titleIndex={titleIndex}
        />
      ) : null}

      <input type="range"></input>
      <input type="checkbox"></input>
      <input type="date"></input>
      <select></select>
      <textarea></textarea>
    </div>
  );
}

// 모달 컴포넌트
function Modal(props) {
  const [titles, color, handleChangeTitle, titleIndex] = [
    props.titles,
    props.color,
    props.handleChangeTitle,
    props.titleIndex,
  ];
  return (
    <div className="modal" style={{ background: color }}>
      <h4>{titles[titleIndex]}</h4>
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
