export const colors = {
    divider: '#F0F0F0',
    icon: '#808080',
    text: {
        primary: '#202020',
        secondary: '#808080',
        disabled: '#E5E5E5',
    },
    background: '#FFFFFF',
    menus: '#3D3D3D',
    disabled: '#E5E5E5',
    inbox: '#246fe0',
    date: {
        past: '#D1453B',
        today: '#058527',
        tomorrow: '#EB8909',
        futureClose: '#692FC2',
        future: '#808080',
    },
    priority: {
        high: {
            main: '#D1453B',
            fill: 'rgba(209,69,59,.1)',
        },
        medium: {
            main: '#EB8909',
            fill: 'rgba(235,137,9,.1)',
        },
        low: {
            main: '#246FE0',
            fill: 'rgba(36,111,224,.1)',
        },
        none: {
            main: '#808080',
            fill: '#F2F2F2',
        },
    },
} as const;

export const spacing = (value: number): number => value * 4;
