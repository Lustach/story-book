export type DataChild = { label: string; icon?: string; children?: DataChild[] }
export type Props = {
  data?: DataChild[]
  label: string
  icon?: string
  depth: number
  smallMenu: boolean
}
