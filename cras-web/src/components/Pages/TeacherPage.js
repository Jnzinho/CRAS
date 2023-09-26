import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import '../../index.css';


function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  
  async function getTeachers() {
    const response = await axios.get("http://localhost:3000/teachers");
    return response.data;
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);
  console.log(teachers );
  const renderedTeachers = teachers.map((teacher) => {
    return <div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{teacher.name}</div>
    <p class="text-gray-700 text-base">
      <p>User: {teacher.username}</p>
      <p>Criado em: {teacher.createdAt}</p>
      <p>Atualizado em: {teacher.updatedAt}</p>
      <p>Id: {teacher.id}</p>
    </p>
  </div>

</div>
    </div>;
  });

  return <div>
    <h1>Teachers</h1>
    <ul>{renderedTeachers}</ul>
  </div>;
}

export default TeacherPage;