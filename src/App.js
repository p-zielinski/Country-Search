import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import styled from "styled-components";
import {MainWrapper} from "./styled";

function App() {
  return (
    <Background>
      <MainWrapper>
      <Routes>
        <Route path="/*" element={<Home key={"main"} />} />
      </Routes>
    </MainWrapper>
    </Background>
  );
}

export default App;

const Background = styled.div`
  background: rgb(242, 244, 246);
  p {
    margin: 0;
  }
`;
