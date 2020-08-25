import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import {
  Container,
  Table as ProjectTable,
  Pagination,
  PaginationButton,
  PaginationItem,
} from "./styles";

function Table() {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get(
        `/projects?page=${currentPage}&limit=${limit}`
      );
      const { data } = response;
      const { headers } = response;

      setTotal(headers["x-total-count"]);
      setProjects(data);
    }

    loadProjects();
  }, [currentPage, limit]);

  useEffect(() => {
    const totalPages = Math.ceil(total / limit);

    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);
  }, [total]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  });

  return (
    <Container>
      <h3>Tabela de projetos</h3>
      <select onChange={limits}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="100">100</option>
      </select>
      <ProjectTable>
        <thead>
          <tr>
            <th>id do projeto</th>
            <th>titulo</th>
            <th>id do usuario</th>
            <th>data de criacao</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <>
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.user_id}</td>
                <td>{project.created_at}</td>
              </tr>
            </>
          ))}
        </tbody>
      </ProjectTable>

      <Pagination>
        <div>Quantidade: {total}</div>
        <PaginationButton>
          {currentPage > 1 && (
            <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
              Prev
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem
              isSelect={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationItem>
          ))}
          {currentPage < pages.length && (
            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </PaginationItem>
          )}
        </PaginationButton>
      </Pagination>
    </Container>
  );
}

export default Table;
