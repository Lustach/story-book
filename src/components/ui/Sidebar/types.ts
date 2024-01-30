export type DataChild = { label: string; icon?: string; children?: DataChild[]; path?: string }
export type Props = {
  data?: DataChild[]
  label: string
  icon?: string
  depth: number
  isSmall: boolean
  path?: string
}
