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
  number: (v: any) => (v && !isNaN(Number(v))) || 'Please enter a valid number',
  
  // IP Address and Port
  ipAddress: (v: string) => {
    const pattern = /^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?::[1-9]|[1-9][0-9]|[1-5][0-9]{2}|[6][0-4][0-9]{2}|65[0-4][0-9]|655[0-2][0-9]|6553[0-5])?$/
    return pattern.test(v) || 'Please enter a valid IP address and port (xxx.xxx.xxx.xxx:xxxx)'
  },
  // number between 0 and 60
  numberBetween0And60: (v: any) => {
    const num = Number(v);
    return (isNaN(num) || num < 0 || num > 60) ? 'Please enter a valid number between 0 and 60' : true;
  },
}

