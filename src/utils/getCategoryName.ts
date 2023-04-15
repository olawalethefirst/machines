import {MachineCategory} from '../types';

const getCategoryName = (category: MachineCategory) => {
  return category.name.length > 0
    ? category.name
    : 'Unnamed Category - ' + category.id;
};

export default getCategoryName;
