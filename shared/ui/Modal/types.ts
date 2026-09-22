import React, { ReactNode } from 'react';

export interface ModalAction {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    href?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    icon?: string;
    title: string;
    description?: ReactNode;
    children?: ReactNode;
    primaryAction?: ModalAction;
    secondaryAction?: ModalAction;
}
