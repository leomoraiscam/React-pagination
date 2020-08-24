import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Container } from "./styles";

function Table() {
  useEffect(() => {
    async function loadProjects() {
      const response = await api.get("/projects");
      console.log(response);
    }

    loadProjects();
  }, []);

  return (
    <Container>
      <h3>Tabela de projetos</h3>
    </Container>
  );
}

export default Table;
