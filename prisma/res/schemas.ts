export const catSchema = {
  AGE_LEFT: { prop: 'ageLeft', type: Number },
  AGE_RIGHT: { prop: 'ageRight', type: Number },
  GENDER: { prop: 'gender', type: String, oneOf: ['FEMALE', 'MALE'] },
};

export const recSchema = {
  TYPE: {
    prop: 'type',
    type: String,
    oneOf: ['APPOINTMENT', 'EXAMINATION', 'VACCINATION'],
  },
  NAME: { prop: 'name', type: String },
  FREQUENCY: { prop: 'frequency', type: Number },
  CATEGORY_ID: { prop: 'categoryId', type: Number, required: false },
};

export const advSchema = {
  DESCRIPTION: { prop: 'description', type: String },
};
