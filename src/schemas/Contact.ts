import * as yup from 'yup'

export const ContactInfo = yup
  .object({
    FullName: yup.string().required(),
    Message: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
  })
  .required()
