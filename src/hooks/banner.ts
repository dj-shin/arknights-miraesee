import b1 from '../resources/banners/1631513187.jpg';
import b2 from '../resources/banners/1631513198.jpg';
import b3 from '../resources/banners/1631513986.jpg';
import b4 from '../resources/banners/1631516490.jpg';
import b5 from '../resources/banners/1631516509.jpg';

import p1 from '../resources/previews/preview_001.jpg';
import p2 from '../resources/previews/preview_002.jpg';
import p3 from '../resources/previews/preview_003.jpg';
import p4 from '../resources/previews/preview_004.jpg';
import p5 from '../resources/previews/preview_005.jpg';

export interface Banner {
    name: string;
    start: Date;
    end: Date;
    image: string;
    preview: string;
}
export const banners: Banner[] = [
    {
        name: 'passenger',
        start: new Date(2021, 9, 15),
        end: new Date(2021, 9, 29),
        image: b1,
        preview: p1,
    },
    {
        name: 'paellas',
        start: new Date(2021, 10, 2),
        end: new Date(2021, 10, 16),
        image: b2,
        preview: p2,
    },
    {
        name: 'carnelian',
        start: new Date(2021, 10, 16),
        end: new Date(2021, 10, 30),
        image: b3,
        preview: p3,
    },
    {
        name: 'abyssal',
        start: new Date(2021, 11, 2),
        end: new Date(2021, 11, 16),
        image: b4,
        preview: p4,
    },
    {
        name: 'szran',
        start: new Date(2021, 11, 16),
        end: new Date(2021, 11, 30),
        image: b5,
        preview: p5,
    },
];
