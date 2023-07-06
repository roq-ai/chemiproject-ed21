import axios from 'axios';
import queryString from 'query-string';
import { ComplianceInterface, ComplianceGetQueryInterface } from 'interfaces/compliance';
import { GetQueryInterface } from '../../interfaces';

export const getCompliances = async (query?: ComplianceGetQueryInterface) => {
  const response = await axios.get(`/api/compliances${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCompliance = async (compliance: ComplianceInterface) => {
  const response = await axios.post('/api/compliances', compliance);
  return response.data;
};

export const updateComplianceById = async (id: string, compliance: ComplianceInterface) => {
  const response = await axios.put(`/api/compliances/${id}`, compliance);
  return response.data;
};

export const getComplianceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/compliances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteComplianceById = async (id: string) => {
  const response = await axios.delete(`/api/compliances/${id}`);
  return response.data;
};
