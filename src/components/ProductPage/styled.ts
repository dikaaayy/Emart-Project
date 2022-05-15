import styled from "styled-components";

export const CardBox = styled.div`
  background-color: #e5e5e5;
  border: 1px solid #9b9b9b;
  box-sizing: border-box;
  height: 280px;
  width: 200px;
  border-radius: 12.56px;
`;

export const CardImage = styled.div`
  position: relative;
  width: 160px;
  height: 153px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ProductName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: relative;
  width: 160px;
  height: 40px;
  left: 0px;
  top: 163px;
`;

export const ProductGridDiv = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
`;
