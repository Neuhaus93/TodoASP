export const colors = {
    divider: '#F0F0F0',
    icon: '#808080',
    text: '#202020',
    background: '#FFFFFF',
    menus: '#3D3D3D',
    date: {
        past: '#D1453B',
        today: '#058527',
        tomorrow: '#EB8909',
        futureClose: '#692FC2',
        future: '#808080',
    },
} as const;

export const spacing = (value: number): number => value * 4;
