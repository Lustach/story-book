export const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value
export function fixCrlf(e: string): string {
  if (!Array.isArray(e)) {
    e = e.replace(/(\r\n|\n|\r)/g, '\r\n')
  }
  return e
}
export function fixEnterChar(e: string): string {
  if (!Array.isArray(e)) {
    e = e.replace(/(\r\n|\n|\r)/g, '')
  }
  return e
}

type Field = {
  value: string
  maxLength: number
}

export function fieldHandlerMaxLength(field: Field): string {
  if (field.value.length > field.maxLength) {
    field.value = field.value.slice(0, -(field.value.length - field.maxLength))
  }
  return field.value
}

export default {
  fixCrlf,
  fixEnterChar
}
