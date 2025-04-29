import axios from "axios";

const axiosPublic = axios.create({
    //  baseURL:'http://localhost:5000/api',
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
