import styled from "styled-components";

export const Container = styled.div``;

export const Table = styled.table`
  width: 500px;
  border-collapse: collapse;

  th {
    padding: 10px;
    background: #dcdcdc;
    text-align: left;
  }

  tbody {
    width: 100%;
    border: 1px solid #dcdcdc;

    tr {
      text-align: left;
      border-bottom: 1px solid #dcdcdc;

      td {
        padding: 10px;
        text-align: left;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;
export const PaginationButton = styled.div`
  display: flex;
`;

export const PaginationItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;
