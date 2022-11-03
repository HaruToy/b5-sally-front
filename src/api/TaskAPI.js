import axios from 'axios';

const API_BASE_URL = `http://localhost:8080/tasks`;

async function findAll() {
  const option = {
    method: 'GET',
    url: API_BASE_URL,
  };
  let response;
  try {
    response = await axios(option);
  } catch (e) {
    console.log(e);
  }
  return response.data;
}

async function enrollTask(task) {
  const option = {
    method: 'POST',
    url: API_BASE_URL,
    data: task,
  };
  let response;
  try {
    response = await axios(option);
  } catch (e) {
    console.log(e);
  }
  return response;
}

async function updateTask(item) {
  const option = {
    method: 'POST',
    url: `http://localhost:8080/tasks/${item.id}`,
    data: item

  };
  let response;
  try {
    response = await axios(option);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export { findAll,updateTask,enrollTask };
