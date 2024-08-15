export const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || 'Please enter a valid email address'
  },
  required: (v: any) => !!v || 'This field is required',
  minLength: (v: any) => (v && v.length >= 8) || `Less than 8 characters`,
  maxLength: (v: any, max: number) => (v && v.length <= max) || `Max ${max} characters`,
  sameAs: (v: any, field: any) => (v === field) || 'Password does not match',
  //number
  number: (v: any) => (v && !isNaN(v)) || 'Please enter a valid number',
}
