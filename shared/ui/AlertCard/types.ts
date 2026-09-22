export type AlertCardVariant = 'critical' | 'warning' | 'info' | 'success';

export interface AlertCardProps {
    variant: AlertCardVariant;
    icon: string;
    badgeLabel: string;
    title: string;
    description: string;
    statusLabel: string;
    statusValue: string;
    onClick?: () => void;
}
