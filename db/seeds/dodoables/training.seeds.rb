puts "OEEEEEEEEEEE"

def exercise_dodoable(dodoable_attributes)
  {
    nature: :nested,
    trigger: {
      display: 'Empty'
    },
    executor: {
      type: 'Steps'
    }
  }
end

after :base do
  user = User.find 1

  [
    { slug: 'training:bodybuilding:push:push-ups:closed:0deg:bodyweight', name: 'Closed Push Ups' },
    { slug: 'training:bodybuilding:push:push-ups:open:0deg:bodyweight', name: 'Open Push Ups' },
  ].each do |dodoable_attributes|
  Dodoable.where(
    slug: dodoable_attributes[:slug],
    user_id: user.id
  )
    .first_or_create
    .update(dodoable_attributes)
end
