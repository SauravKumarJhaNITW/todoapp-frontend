import http from "./httpService";

const apiEndpoint = "/dones";

export async function getDoneList() {
  const { data: dones } = await http.get(apiEndpoint);
  return dones;
}

export async function deleteDone(_id) {
  await http.delete(apiEndpoint + "/" + _id);
}

export async function deleteAllDone() {
  await http.delete(apiEndpoint + "/all");
}
