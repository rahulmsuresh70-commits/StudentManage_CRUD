
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getStudents = async () => {
    const response = await axios.get(`${API_URL}/students/`);
    return response.data;
};