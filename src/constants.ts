// Machine Atrribute Value Types
export const attributeValueOptions = [
  'text',
  'number',
  'checkbox',
  'date',
] as const;

export const colors = {
  darkPurple: '88, 0, 232',
  lightPurple: '114, 55, 204',
  offWhiteBackground: '239, 239, 239',
  white: '255, 255, 255',
  lightGrey: '243, 243, 243',
  darkGrey: '181, 181, 181',
  black: '16, 16, 16',
  red: '255, 0, 0',
} as const;

export const errors = {
  minAttributeCount: 'minimum of 1 attribute required',
  uniqueName: 'name must be unique',
  minTextAttributeCount: 'minimum of 1 text attribute required',
};

export const maxCardSize = 650;
export const minAttributesCount = 1;
