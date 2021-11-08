# Push ups
# rest between sets, sets

# 5/4/3/2/1 benchpress
# rest, base weight, number of sets

# chromatisms
# rest, base bpm

def sre(dodoable_attributes) # Simple Reps Exercise
  {
    nature: :nested,
    trigger: {
      display: 'Empty'
    },
    executor: {
      save_on_field_changed: false,
      type: 'Steps',
    },
    fields: {
      rest: {
        type: :number,
        default: 60,
        order: 0
      },
      sets: {
        type: :collection,
        order: 1,
        default: [
          { reps: 10, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 10, weight: 0 }
        ],
        fields_options: {
          variant: :compact
        },
        fields: {
          reps: {
            type: :number,
            order: 0
          },
          weight: {
            type: :number,
            order: 1
          }
        }
      }
    }
  }.merge(dodoable_attributes)
end

after :base do
  user = User.find 1

  [
    sre(slug: 'training:bodybuilding:push:push-ups:closed:0deg:bodyweight', name: 'Closed Push Ups'),
    sre(slug: 'training:bodybuilding:push:push-ups:open:0deg:bodyweight', name: 'Open Push Ups'),
  ].each do |dodoable_attributes|
    next

    Dodoable.where(
      slug: dodoable_attributes[:slug],
      user_id: user.id
    )
      .first_or_create
      .update(dodoable_attributes)
  end
end
