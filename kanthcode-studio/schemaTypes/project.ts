// schemaTypes/project.ts
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Fullstack', 'Hardware', 'Software', 'frontend'],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        maxLength: 96,
      },
    },

    {
      name: 'technologies',
      title: 'Technologies / Stack',
      type: 'array',
      of: [{type: 'string'}],
      Options: {
        layout: 'tags',
      },
    },
  ],
}
