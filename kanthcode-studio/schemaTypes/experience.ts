export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {name: 'role', title: 'Role', type: 'string'},
    {name: 'company', title: 'Company/Org', type: 'string'},
    {name: 'duration', title: 'Duration', type: 'string'},
    {name: 'description', title: 'Key Responsibilities', type: 'array', of: [{type: 'block'}]},
    {name: 'order', title: 'Order', type: 'number'},
  ],
}
