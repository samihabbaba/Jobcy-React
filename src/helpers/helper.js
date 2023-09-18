import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user"))?.access_token
    }`,
  },
});

export function setSeekerLocal(jobSeeker) {
  localStorage.setItem("jobSeeker", JSON.stringify(jobSeeker));
}

export function getSeekerLocal() {
  return JSON.parse(localStorage.getItem("jobSeeker"));
}

export function setCompanyLocal(company) {
  localStorage.setItem("company", JSON.stringify(company));
}

export function getCompanyLocal() {
  return JSON.parse(localStorage.getItem("company"));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function getFile(fileId) {
  if (fileId) {
    const resp = await axiosInstance.get(`/file/${fileId}`, {
      responseType: "blob",
    });
    return resp.data;
  }
}

export function generateRandomCode() {
  const min = 100000; // Minimum value (inclusive)
  const max = 999999; // Maximum value (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
