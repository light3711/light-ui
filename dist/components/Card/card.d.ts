import React from 'react';
import { CSSProperties } from 'react';
interface cardProps {
    classnames?: string;
    title?: any;
    contents?: boolean;
    children?: React.ReactNode;
    code?: string;
    style?: CSSProperties;
}
export declare const Card: {
    (props: cardProps): JSX.Element;
    defaultProps: {
        title: string;
        contents: boolean;
    };
};
export {};
