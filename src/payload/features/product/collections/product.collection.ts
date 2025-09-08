import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      th: 'สินค้า',
    },
    plural: {
      th: 'สินค้า',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Example',
    components: {
      views: {
        edit: {
          customView: {
            path: '/detail',
            Component: {
              path: '@/payload/features/product/pages',
              exportName: 'ProductDetailPage',
            },
            tab: {
              label: 'รายละเอียด',
              href: '/detail',
              order: 1,
            },
          },
        },
      },
    },
    defaultColumns: ['name', 'slug', 'price', 'updatedAt', 'updatedBy', 'actions'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.user) {
          data.updatedBy = req.user.id
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        components: {
          Cell: {
            path: '@/payload/components',
            exportName: 'PriceCell',
          },
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      displayPreview: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'หมวดหมู่',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
          ],
        },
        {
          label: 'ความคิดเห็น',
          fields: [
            {
              name: 'comments',
              type: 'relationship',
              relationTo: 'comments',
              hasMany: true,
              admin: {
                isSortable: true,
              },
            },
          ],
        },
        {
          label: 'เชื่อมโยงหลักสูตร',
          fields: [
            {
              label: 'เลือกหลักสูตร',
              labels: {
                plural: {
                  th: 'หลักสูตร',
                  en: 'Curriculum',
                },
                singular: {
                  th: 'หลักสูตร',
                  en: 'Curriculum',
                },
              },
              name: 'linkCurriculums',
              type: 'array',
              required: true,
              fields: [
                {
                  label: 'มหาวิทยาลัย',
                  name: 'university',
                  type: 'relationship',
                  relationTo: 'universities',
                  required: true,
                },
                {
                  label: 'เลือกคณะและสาขา',
                  labels: {
                    plural: {
                      th: 'คณะและสาขา',
                      en: 'Faculty and Major',
                    },
                    singular: {
                      th: 'คณะและสาขา',
                      en: 'Faculty and Major',
                    },
                  },
                  name: 'faculties',
                  type: 'array',
                  required: true,
                  admin: {
                    // show when university is selected
                    condition: (_, { university }) => !!university,
                  },
                  fields: [
                    {
                      label: 'คณะ',
                      name: 'faculty',
                      type: 'relationship',
                      relationTo: 'faculties',

                      required: true,
                      filterOptions: async ({ data, siblingData, req }) => {
                        const currentLinkCurriculum = data?.linkCurriculums?.find(
                          (linkCurriculum: { id: string; faculties: { id: string }[] }) =>
                            linkCurriculum.faculties.find(
                              (faculty) => faculty.id === (siblingData as { id: string }).id,
                            ),
                        )
                        const userUniversityId = currentLinkCurriculum?.university

                        if (!userUniversityId) {
                          return true
                        }

                        const university = await req.payload.findByID({
                          collection: 'universities',
                          id: userUniversityId,
                        })

                        const facultyIds = university?.faculties.map((facultyRelation) =>
                          typeof facultyRelation.faculty === 'number'
                            ? facultyRelation.faculty
                            : facultyRelation.faculty.id,
                        )

                        return {
                          id: {
                            in: facultyIds,
                          },
                        }
                      },
                    },
                    {
                      label: 'สาขา',
                      name: 'majors',
                      type: 'relationship',
                      relationTo: 'majors',
                      hasMany: true,
                      required: true,
                      admin: {
                        condition: (_, { faculty }) => !!faculty,
                      },
                      filterOptions: async ({ data, siblingData, req }) => {
                        const currentLinkCurriculum = data?.linkCurriculums?.find(
                          (linkCurriculum: { id: string; faculties: { id: string }[] }) =>
                            linkCurriculum.faculties.find(
                              (faculty) => faculty.id === (siblingData as { id: string }).id,
                            ),
                        )
                        const userUniversityId = currentLinkCurriculum?.university

                        if (!userUniversityId) {
                          return true
                        }

                        const university = await req.payload.findByID({
                          collection: 'universities',
                          id: userUniversityId,
                        })

                        const selectedFacultyId = (siblingData as { faculty: number }).faculty
                        const selectedFaculty = university.faculties.find((facultyRelation) =>
                          typeof facultyRelation.faculty === 'number'
                            ? facultyRelation.faculty
                            : facultyRelation.faculty.id === selectedFacultyId,
                        )

                        if (!selectedFaculty) {
                          return true
                        }

                        const majorIds = selectedFaculty.majors?.map((major) =>
                          typeof major === 'number' ? major : major.id,
                        )

                        return {
                          id: {
                            in: majorIds,
                          },
                        }
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'ui',
              name: 'summary',
              admin: {
                condition: (_, { linkCurriculums }) => !!linkCurriculums?.length,
                components: {
                  Field: {
                    path: '@/payload/features/product/components',
                    exportName: 'LinkCurriculumSummaryUiField',
                  },
                },
              },
            },
            // TODO: This is common field for all collections. Move to utils or constants
            {
              type: 'ui',
              name: 'actions',
              admin: {
                components: {
                  Field: {
                    path: '@/payload/components',
                    exportName: 'NavigationAfterChangeField',
                  },
                  Cell: {
                    path: '@/payload/components',
                    exportName: 'LinkToViewCell',
                  },
                },
              },
            },
            // TODO: Confirm with PO that we need to add updatedBy field to some collections or all collections
            // if all create custom plugin to apply all see: https://payloadcms.com/docs/plugins/overview#example
            {
              name: 'updatedBy',
              label: 'แก้ไขโดย',
              type: 'relationship',
              relationTo: 'users',
              hasMany: false,
              admin: {
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Products
