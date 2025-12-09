import { Category } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'visto_check_data_v1';

export const saveCategories = (categories: Category[]) => {
  try {
    const data = JSON.stringify(categories);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Failed to save data', error);
  }
};

export const loadCategories = (): Category[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load data', error);
  }
  return JSON.parse(JSON.stringify(INITIAL_DATA)); // Return a deep copy of initial data
};

export const resetData = (): Category[] => {
    localStorage.removeItem(STORAGE_KEY);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
};