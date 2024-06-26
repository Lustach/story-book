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
    label: 'Form',
    icon: 'dashboard',
    children: [
      {
        label: 'Input',
        path: '/input'
      },
      {
        label: 'Textarea',
        path: '/textarea'
      }
      // {
      //   label: 'Select',
      //   path: '/input_default'
      // }
    ]
  },
  {
    label: 'Alert',
    icon: 'info',
    path: '/alert'
  },
  {
    label: 'Tab',
    icon: 'tab',
    path: '/tab'
  },
  {
    label: 'ProgressBar',
    icon: 'tab',
    path: '/progressbar'
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
