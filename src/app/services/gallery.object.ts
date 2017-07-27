export interface GalleryObject {
    active: boolean;
    images?: GalleryImage[];
    hasNext?: boolean;
    hasPrev?: boolean;
    prevIndex?: number;
    currIndex?: number;
}

export interface GalleryImage {
    $key: string;
    path: string;
    src?: any;
    title?: string;
}

export const defaultObject: GalleryObject = {
    active: false,
    images: undefined,
    hasNext: undefined,
    hasPrev: undefined,
    prevIndex: 0,
    currIndex: 0
};
