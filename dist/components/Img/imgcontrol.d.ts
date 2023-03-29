/// <reference types="react" />
interface ImgPropps {
    src: Array<{
        id: number;
        src: string;
    }>;
    currentIndex?: number;
    onClose?: Function;
}
export declare const Imgcontrol: (props: ImgPropps) => JSX.Element;
export {};
