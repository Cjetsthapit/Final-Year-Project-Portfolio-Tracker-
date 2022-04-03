import axios from "axios";

export const getTransaction = (id) => {
  return axios.get(`/api/get-transaction/${id}`);
};

export const logout = () => {
  axios.post(`/api/logout`);
};

export const createPortfolio = (data) => {
  axios.post(`/api/create-portfolio`, data);
};
export const addTransaction = (data) => {
  axios.post(`/api/create-transaction`, data);
};

export const listUserPortfolio = (id) => {
  return axios.get(`/api/get-portfolio/${id}`);
};
export const portfolioInvestment = (id) => {
  return axios.get(`/api/get-user-portfolio/${id}`);
};
export const singlePortfolio = (id) => {
  return axios.get(`/api/fetch-portfolio/${id}`);
};
export const singleTransaction = (id, name) => {
  return axios.get(`/api/get-singletransaction/${id}/${name}`);
};

export const fetchShareData = async () => {
  const {
    data: { share },
  } = await axios.get(`/api/call`);
  return share;
};
export const fetchGainerLoserData = async () => {
  const {
    data: { gainer, loser },
  } = await axios.get(`/api/gainer`);
  return { gainer, loser };
};

export const fetchGraphData = async (id) => {
  const {
    data: { databyUnits, databyInvestment },
  } = await axios.get(`/api/chart/${id}`);
  return { databyUnits, databyInvestment };
};

export const fetchSingleLineData = async (id, name) => {
  const { data } = await axios.get(`/api/singlechart/${id}/${name}`);
  return { data };
};
