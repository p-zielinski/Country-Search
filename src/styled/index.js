import styled from "styled-components";

export const Button = styled.div`
  background: rgb(221, 232, 243);
  border: solid 1px rgb(132, 185, 238);
  max-width: 800px;
  margin: 0 auto 10px auto;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  :hover{
    -webkit-box-shadow: 0px 0px 5px 0px rgba(148, 158, 241, 1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(148, 158, 241, 1);
    box-shadow: 0px 0px 5px 0px rgba(148, 158, 241, 1);
  }
`

export const MainWrapper = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  max-width: 1600px;
  width: 100%;
  min-width: 200px;
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-flow: column;
  margin: auto;
  color: rgb(31, 33, 44);
`;

export const WarningHolder = styled.div`
  margin: -5px;
  margin-bottom: -10px;
  width: 100%;
  font-size: 13px;
  color: rgba(255, 0, 0, 0.85);
`;

export const FormWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  min-width: 200px;
  min-height: auto;
  text-align: center;
  display: flex;
  flex-flow: column;
  background: rgba(210, 200, 188, 0.4);
  border-radius: 3px;
  border: 2px solid rgba(210, 200, 188, 1);
  margin: auto;
  padding: 0;
`;

export const LoadingText = styled.div`
  margin: auto 0;
`;