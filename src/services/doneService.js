import http from "./httpService";

const apiEndpoint = "/dones";

export async function getDoneList() {
  const { data: dones } = await http.get(apiEndpoint);
  return dones;
}

export async function deleteDone(_id) {
  try {
    await http.delete(apiEndpoint + "/" + _id);
  } catch (ex) {}
}

export async function deleteAllDones() {
  await http.delete(apiEndpoint + "/all");
}
