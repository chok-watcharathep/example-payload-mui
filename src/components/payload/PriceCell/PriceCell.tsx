import { DefaultCellComponentProps } from 'payload'

const PriceCell = ({ cellData }: DefaultCellComponentProps) => {
  if (typeof cellData === 'number') {
    return <span>{new Intl.NumberFormat('en-US').format(cellData)}</span>
  }

  return <span>-</span>
}

export default PriceCell
