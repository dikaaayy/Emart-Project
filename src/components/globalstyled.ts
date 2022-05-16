import styled from "styled-components";

export const NavBar = styled.div`
  justify-content: space-between;
  width: 100%;
  display: flex;
  position: fixed;
  background: #16213b;
  z-index: 2;
  padding: 1.2rem;
`;

export const HeaderHomeIcon = styled.div`
  display: flex;
  align-content: center;
  cursor: pointer;
  padding: 0rem 1rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  &:hover {
    background-color: #1f2d4d;
    border-radius: 0.5rem;
  }
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const HeaderAddProductButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0rem 1.2rem;
  font-weight: 600;
  color: white;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  &:hover {
    background-color: #1f2d4d;
    border-radius: 0.5rem;
    color: #e3e3e3;
  }
`;
