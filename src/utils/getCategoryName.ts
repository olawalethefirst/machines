import {MachineCategory} from '../types';

const getCategoryName = (category: MachineCategory) => {
  return category.lastUniqueName.length > 0
    ? category.lastUniqueName
    : 'Unnamed Category - ' + category.id;
};

export default getCategoryName;
