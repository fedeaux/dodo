user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

def meal_dodoable(slug_suffix, name)
  {
    name: name,
    slug: "meal:#{slug_suffix}",
    executor: {
      component: 'SimpleForm'
    },
    trigger: {
      component: 'Meal'
    },
    fields: {
      status: {
        type: :select,
        options: text_select_options(['Ate it', 'Skip', 'Something Else']),
        default: 'Ate it'
      },
      comments: {
        type: :text
      }
    },
  }
end

def text_select_options(options)
  options.map do |option|
    {
      value: option,
      label: option
    }
  end
end

def todo_fields(*fields)
  field_hash = {}

  fields.each do |field|
    field_hash[field.downcase.gsub(/\s/, '-')] = {
      type: :bool,
      label: field
    }
  end

  field_hash
end

[
  meal_dodoable('first', '08:00: Salad Cottage Sandwich'),
  meal_dodoable('second', '11:30: Yogurt Grains'),
  meal_dodoable('third', '15:00: Frozen Lunch'),
  meal_dodoable('fourth', '19:30: ?'),
  meal_dodoable('fifth', '23:00: Corn Flakes'),
  {
    name: 'Smoking',
    slug: "bad-habit:smoking",
    executor: {
      component: 'SimpleForm'
    },
    trigger: {
      component: 'Habit',
    },
    fields: {
      trigger: {
        type: :select,
        options: [
          'Bathroom',
          'Eat',
          'Sex',
          'Sleep',
          'Wakeup'
        ]
      },
      comments: {
        type: :text
      }
    },
  },
  {
    name: 'Breath Meditation',
    slug: "meditation:Breath",
    executor: {
      component: '?'
    },
    trigger: {
      component: '?',
    },
    fields: {},
  },
  {
    name: 'Evening Chores',
    slug: "chores:evening",
    executor: {
      component: 'Todo',
    },
    trigger: {
      component: '?',
    },
    fields: {}.merge(
      todo_fields(
        'Tea',
        'Juice',
        'Water',
        'Setup Coffee',
        'Milk and Albumin',
        'Salad and Fish',
        'One song cleanup',
        'Skincare'
      )
    ),
  }
].each do |dodoable_attributes|
  Dodoable.where(
    slug: dodoable_attributes[:slug],
    user_id: user.id
  )
    .first_or_create
    .update(dodoable_attributes)
end

# Dodoable.where(name: 'Art', slug: 'art', user_id: user.id).first_or_create
# Dodoable.where(name: 'Exercise', slug: 'exercise', user_id: user.id).first_or_create
# Dodoable.where(name: 'Enlightment', slug: 'enlightment', user_id: user.id).first_or_create
# Dodoable.where(name: 'Wordable', slug: 'wordable', user_id: user.id).first_or_create
# Dodoable.where(name: 'Projects', slug: 'projects', user_id: user.id).first_or_create

# weekdays = {
#   mon: {
#     schedule: {
#       '09:00 -> 09:25' => { title: 'Prepare day' },
#       '09:30 -> 10:50' => { title: 'Investment Operations and Art' },
#       '10:55 -> 13:00' => { title: 'Exercise and Meditation' },
#       '13:00 -> 19:55' => { title: 'Projects' },
#       '20:00 -> 00:30' => { title: 'Lightless Time' },
#     }
#   },
#   tue: {
#     schedule: {
#       '09:00 -> 09:25' => { title: 'Prepare day' },
#       '09:30 -> 10:50' => { title: 'Investment Operations and Art' },
#       '10:55 -> 13:00' => { title: 'Exercise and Meditation' },
#       '13:00 -> 19:25' => { title: 'Lunch and Work' },
#       '19:30 -> 20:25' => { title: 'Dinner, Meditation and Relax' },
#       '20:25 -> 21:55' => { title: 'Projects' },
#       '22:00 -> 00:30' => { title: 'Lightless Time' },
#     }
#   },
#   wed: {
#     schedule: {
#       '09:00 -> 09:25' => { title: 'Prepare day' },
#       '09:30 -> 10:50' => { title: 'Investment Operations and Art' },
#       '10:55 -> 13:00' => { title: 'Exercise and Meditation' },
#       '13:00 -> 19:25' => { title: 'Lunch and Work' },
#       '19:30 -> 20:25' => { title: 'Dinner, Meditation and Relax' },
#       '20:25 -> 21:55' => { title: 'Projects' },
#       '22:00 -> 00:30' => { title: 'Lightless Time' },
#     }
#   },
#   thu: {
#     schedule: {
#       '09:00 -> 09:25' => { title: 'Prepare day' },
#       '09:30 -> 12:25' => { title: 'Long mindful walk, lunch' },
#       '13:00 -> 18:25' => { title: 'Lunch and Work' },
#       '18:30 -> 19:25' => { title: 'Dinner, Meditation and Relax' },
#       '22:00 -> 00:30' => { title: 'Lightless Time' },
#     }
#   },
#   fri: {
#     schedule: {
#       '09:00 -> 09:25' => { title: 'Prepare day' },
#       '09:30 -> 10:50' => { title: 'Investment Operations and Art' },
#       '10:55 -> 13:00' => { title: 'Exercise and Meditation' },
#       '13:00 -> 19:25' => { title: 'Lunch and Work' },
#       '19:30 -> 20:25' => { title: 'Dinner, Meditation and Relax' },
#       '20:25 -> 21:55' => { title: 'Projects' },
#       '22:00 -> 00:30' => { title: 'Lightless Time' },
#     }
#   },
# }
