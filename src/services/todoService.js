import http from "./httpService";

const apiEndpoint = "/todos";

export async function getTodoList() {
  const { data: todos } = await http.get(apiEndpoint);
  return todos;
}

export async function modifyTask({ task, _id }) {
  const { data: todo } = await http.put(apiEndpoint + "/" + _id, {
    task,
  });
  return todo;
}

export async function addTask(task) {
  const { data } = await http.post(apiEndpoint, {
    task,
  });
  return data;
}

export async function deleteTodo(_id, moveToDone) {
  await http.delete(apiEndpoint + "/" + _id, { moveToDone });
}

export async function deleteAllTodos() {
  await http.delete(apiEndpoint + "/all");
}
