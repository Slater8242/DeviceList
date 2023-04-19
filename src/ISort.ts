export type SortField = 'uid' | 'uid_integer' | 'manufacturer' | 'address'

export interface ISort {
  field: SortField
  direction: 'ASC' | 'DESC'
}
