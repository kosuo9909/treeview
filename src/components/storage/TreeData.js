export const treeData = [
  {
    label: 'Root',
    children: [
      {
        label: 'Child 1',
        children: [
          {
            label: 'Child 1 of Child 1',
          },
          {
            label: 'Child 2 of Child 1',
            children: [
              {
                label: 'Child 1 of Child 1 of Child 1',
              },
              { label: 'Child 2 of Child 1 of Child 1' },
            ],
          },
        ],
      },
      {
        label: 'Child 2',
        children: [
          {
            label: 'Child 1 of Child 2',
          },
          { label: 'Child 2 of Child 2' },
        ],
      },
    ],
  },
];
