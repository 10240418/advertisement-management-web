import { TLineChartData } from '../chart_type'

export const pieChartData: TLineChartData = {
  labels: ['Africa', 'Asia', 'Europe'],
  datasets: [
    {
      label: 'Population (millions)',
      backgroundColor: ['primary', 'warning', 'danger'],
      data: [2478, 5267, 734],
    },
  ],
}
