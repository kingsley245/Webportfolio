export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'role', title: 'Professional Role', type: 'string'},
    {name: 'location', title: 'Location', type: 'string'},
    {name: 'bio', title: 'Bio', type: 'array', of: [{type: 'block'}]},
    {name: 'avatar', title: 'Profile Image', type: 'image', options: {hotspot: true}},
    {
      name: 'skills',
      title: 'Skills & Tools',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'category', title: 'Category', type: 'string'},
            {name: 'items', title: 'Items', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    },
  ],
}
