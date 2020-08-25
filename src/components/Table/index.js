import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get("/projects");
      const { data } = response;
      const { headers } = response;

      setTotal(headers["x-total-count"]);
      setProjects(data);
    }

    loadProjects();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(total / limit);

    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);
  }, [total]);

  return (
    <Container>
      <h3>Tabela de projetos</h3>

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
          {pages.map((page) => (
            <PaginationItem>{page}</PaginationItem>
          ))}
        </PaginationButton>
      </Pagination>
    </Container>
  );
}

export default Table;
