import styled from "styled-components";

export const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    box-sizing: border-box;
  }
`;

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
`;

export const MainImage = styled.div<{ width?: string }>`
  margin-bottom: 10px;
  max-width: 800px;

  img {
    max-width: ${({ width }) => width ? width : "680px"};
    min-width: 680px;
    width: 100%;
    max-height: 474px;
    border-radius: 20px;
    display: block;
  }
`;

export const VisibleItemsContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

export const VisibleItems = styled.div`
  display: flex;
  overflow-x: hidden;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 100%;

  .active {
    border: 2px solid blue;
  }
  .non-active {
    border: none;
  }
`;

export const VisibleItem = styled.div`
  flex: 0 0 auto;
  cursor: pointer;
  
  img {
    width: 160px;
    height: auto;
    border: 2px solid transparent;
    transition: border-color 0.3s ease;
    border-radius: 10px;

    &:hover {
        border: 2px solid blue !important;
    }

  }
`;

export const Navigation = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: -15px;
`;

export const NavigateButton = styled.button`
    background: transparent;
    outline: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    :hover {
        width: 54px;
    }

    svg {
        width: 50px;
    }
`;