export interface DonutChartLegendItem {
    label: string;
    count?: number;
    colorClass: string;
}

export interface DonutChartProps {
    title: string;
    percentage: number;
    label?: string;
    legend?: DonutChartLegendItem[];
}
