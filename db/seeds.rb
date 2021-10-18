user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

def meal_dodoable(slug_suffix, name)
  {
    name: name,
    slug: "meal:#{slug_suffix}",
    executor: {
      day_interaction: :once
    },
    trigger: {
      display: 'Meal',
      icon: {
        component: 'Icon5',
        name: 'utensils'
      }
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
    field_hash[field.downcase.gsub(/\s/, '_').camelize(:lower)] = {
      type: :bool,
      label: field
    }
  end

  field_hash
end

def practice_dodoable(name, slug)
  {
    name: name,
    slug: slug,
    nature: :independent,
    executor: {
      finished_at_behaviour: :chronometer
    },
    trigger: {
      display: 'Empty',
    },
    fields: {},
  }
end

def bad_habits
  [
    {
      name: 'Smoking',
      slug: "bad-habit:smoking",
      nature: :habit,
      executor: {
        finished_at_behaviour: :instantaneous
      },
      trigger: {
        display: 'BadHabit',
        label: 'Last cigar',
        icon: {
          name: 'smoking-ban',
          component: 'Icon5'
        }
      },
      fields: {
        trigger: {
          type: :select,
          options: text_select_options([
                                         'Bathroom',
                                         'Eat',
                                         'Rest',
                                         'Sex',
                                         'Sleep',
                                         'Social',
                                         'Wakeup'
                                       ])
        },
        comments: {
          type: :text
        }
      },
    },
    {
      name: 'League',
      slug: "bad-habit:league",
      nature: :habit,
      executor: {
        finished_at_behaviour: :instantaneous
      },
      trigger: {
        display: 'BadHabit',
        label: 'Last league',
        icon: {
          name: 'gamepad',
          component: 'Icon5'
        }
      },
      fields: {
        comments: {
          type: :text
        }
      },
    },
  ]
end

[
  meal_dodoable('first', 'Salad Cottage Sandwich'),
  meal_dodoable('second', 'Yogurt Grains'),
  meal_dodoable('third', 'Frozen Lunch'),
  meal_dodoable('fourth', 'Free'),
  meal_dodoable('fifth', 'Corn Flakes'),
  practice_dodoable('Guitar', 'music:guitar'),
  practice_dodoable('Piano', 'music:piano'),
  practice_dodoable('Singing', 'music:singing'),
  practice_dodoable('Read', 'read'),
  {
    name: 'Breath Meditation',
    slug: "meditation:Breath",
    nature: :independent,
    executor: {
      finished_at_behaviour: :timer
    },
    trigger: {
      display: '?',
    },
    fields: {},
  },
  {
    name: 'Evening Chores',
    slug: "chores:evening",
    executor: {
      save_on_field_changed: true,
      day_interaction: :once
    },
    trigger: {
      display: 'Todos',
      icon: {
        name: 'hammer',
        component: 'Icon5'
      }
    },
    fields: {}.merge(
      todo_fields(
        'Tea',
        'Juice',
        'Water',
        'Setup Coffee',
        'Milk and Albumin',
        'One song cleanup',
        'Skincare'
      ).merge(
        comments: {
          type: :text,
          order: 999
        }
      )
    ),
  },
  {
    name: 'On Wakeup',
    slug: "chores:wakeup",
    executor: {
      save_on_field_changed: true,
      day_interaction: :once
    },
    trigger: {
      display: 'Todos',
      icon: {
        name: 'hammer',
        component: 'Icon5'
      }
    },
    fields: {}.merge(
      todo_fields(
        'Water',
        'Coffee',
        'Concerta',
        'Drink Milk'
      ).merge(
        comments: {
          type: :text,
          order: 999
        }
      )
    ),
  }
].concat(bad_habits).each do |dodoable_attributes|
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
