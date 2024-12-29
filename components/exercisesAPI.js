import axios from "axios";

const BASE_URL = "https://raw.githubusercontent.com/saadtw/exercises/refs/heads/main/exercises.json"; 
export const exercisesAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error; 
  }
};
