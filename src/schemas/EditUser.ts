import * as yup from 'yup'

export const EditUser = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    image: yup.string().url().required(),
  })
  .required()
