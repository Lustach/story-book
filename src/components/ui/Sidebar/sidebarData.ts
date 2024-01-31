export const data = [
  {
    label: 'Home',
    icon: 'home',
    children: [
      {
        label: 'level 1.1',
        children: [
          {
            label: 'level 1.1.1',
            children: [
              {
                label: 'level 1.1.1.1'
              }
            ]
          }
        ]
      },
      {
        label: 'level 1.2'
      }
    ]
  },
  {
    label: 'Input',
    icon: 'dashboard',
    children: [
      {
        label: 'Default input',
        path: '/input_default'
      },
      {
        label: 'level 2.2',
        path: '/test'
      },
      {
        label: 'level 2.3',
        path: '/about'
      }
    ]
  },
  {
    label: 'Button',
    icon: 'settings',
    path: '/button'
  },
  {
    label: 'Settings',
    icon: 'settings'
  }
]
