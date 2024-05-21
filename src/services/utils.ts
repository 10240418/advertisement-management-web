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
  minLength: (v: string, min: number) => (v && v.length >= min) || `Min ${min} characters`,
  maxLength: (v: string, max: number) => (v && v.length <= max) || `Max ${max} characters`,
  sameAs: (v: string, field: string) => (v === field) || 'Password does not match',
}
