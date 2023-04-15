import sanitizeString from './sanitizeString';

const getAttributeName = (attributeName: string) => {
  const sanitizedName = sanitizeString(attributeName);

  return sanitizedName.length > 0 ? sanitizedName : 'Unnamed Attribute';
};

export default getAttributeName;
