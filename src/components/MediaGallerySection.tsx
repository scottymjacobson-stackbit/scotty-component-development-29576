import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '@stackbit/components/dist/utils/map-styles-to-class-names';
import ImageBlock from '@stackbit/components/dist/components/ImageBlock';

type BaseSectionComponentProps = {
    annotationPrefix: string;
    elementId: string;
};

type Image = {
    url: string;
    altText: string;
    caption: string;
};

export type MediaGallerySectionProps = BaseSectionComponentProps & {
    images?: Image[];
    spacing?: number;
    styles?: any;
};

export default function MediaGallerySection(props: MediaGallerySectionProps) {
    const sectionStyles = props.styles?.self || {};
    return (
        <div
            id={props.elementId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-media-gallery-section',
                'mt-6',
                'px-4',
                'sm:px-8',
                sectionStyles.margin
            )}
            data-sb-field-path={props.annotationPrefix}
        >
            <div
                className={classNames(
                    'flex',
                    'flex-col',
                    'max-w-screen-2xl',
                    'mx-auto',
                    sectionStyles.height ? mapMinHeightStyles(sectionStyles.height) : null,
                    sectionStyles.padding,
                    sectionStyles.alignItems ? mapStyles({ alignItems: sectionStyles.alignItems }) : null,
                    sectionStyles.justifyContent ? mapStyles({ justifyContent: sectionStyles.justifyContent }) : null
                )}
            >
                <div className={classNames('w-full', sectionStyles.width ? mapMaxWidthStyles(sectionStyles.width) : null)}>
                    <MediaGalleryImages {...props} />
                </div>
            </div>
        </div>
    );
}

function LogoImage({ image, index }: { image: Image; index: number }) {
    if (!image) {
        return null;
    }

    return (
        <div className="h-0 w-full pt-1/1 relative items-center">
            <ImageBlock {...image} className="absolute left-0 h-full object-cover top-0 w-full" />
        </div>
    );
}

function MediaGalleryImages(props: MediaGallerySectionProps) {
    const images = props.images || [];
    if (images.length === 0) {
        return null;
    }
    return (
        <div className={classNames('grid', `grid-cols-${images.length}`)} data-sb-field-path=".images">
            {images.map((image, index) => (
                <div key={`image-${index}`} data-sb-field-path={`.${index}`} className="p-2">
                    <LogoImage image={image} index={index} />
                </div>
            ))}
        </div>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
