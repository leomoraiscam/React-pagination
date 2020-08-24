import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Container, Table as ProjectTable } from "./styles";

function Table() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get("/projects");
      const { data } = response;

      setProjects(data);
    }

    loadProjects();
  }, []);

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
    </Container>
  );
}

export default Table;
