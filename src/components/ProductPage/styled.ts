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
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-column-gap: 35px;
    grid-row-gap: 50px;
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-row-gap: 20px;
  justify-items: center;
  align-content: space-evenly;
  padding-top: 8rem;
  padding-bottom: 2rem;
`;
