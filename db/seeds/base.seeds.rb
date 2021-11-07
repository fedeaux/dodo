user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro', timezone: 'America/Sao_Paulo')

def meal_dodoable(slug_suffix, name, fields: {})
  {
    name: name,
    slug: "meal:#{slug_suffix}",
    trigger: {
      display: 'Meal',
      icon: {
        component: 'IconMC',
        name: 'silverware'
      }
    },
    fields: {
      comments: {
        type: :text,
        order: 999
      }
    }.merge(fields),
  }
end

def home_training_dodoable
  {
    name: 'Exercise: Home Training',
    nature: :independent,
    slug: "exercise:home-training",
    executor: {
      type: 'Session'
    },
    trigger: {
      display: 'Empty',
      icon: {
        name: 'gamepad',
        component: 'Icon5'
      },
    },
    fields: {
      comments: {
        type: :text,
        order: 999
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

def bool_fields(*fields)
  field_hash = {}

  fields.each do |field|
    field_hash[field.downcase.gsub(/\s/, '_').camelize(:lower)] = {
      type: :bool,
      label: field
    }
  end

  field_hash
end

def practice_dodoable(name, slug, trigger: {})
  {
    name: name,
    slug: slug,
    nature: :independent,
    trigger: {
      display: 'Empty',
    }.merge(trigger),
    fields: {},
  }
end

def bad_habits
  [
    {
      name: 'Smoking',
      slug: "bad-habit:smoking",
      nature: :habit,
      about_time: :instantaneous,
      trigger: {
        display: 'BadHabit',
        label: 'without cigar',
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
                                         'Car',
                                         'Eat',
                                         "Mom's House",
                                         'Rest',
                                         'Sex',
                                         'Sleep',
                                         'Social',
                                         'Stress/Anxiety',
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
      about_time: :chronometrable,
      trigger: {
        display: 'BadHabit',
        label: 'free of league',
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
    {
      name: 'F1',
      slug: "bad-habit:f1",
      nature: :habit,
      about_time: :instantaneous,
      trigger: {
        display: 'BadHabit',
        label: 'without f1',
        icon: {
          name: 'leaf',
          component: 'Icon5'
        }
      },
      fields: {
        comments: {
          type: :text
        }
      },
    },
    {
      name: 'F5',
      slug: "bad-habit:f5",
      nature: :habit,
      about_time: :instantaneous,
      trigger: {
        display: 'BadHabit',
        label: 'without f5',
        icon: {
          name: 'leaf-maple',
          component: 'IconMC'
        }
      },
      fields: {
        comments: {
          type: :text
        }
      },
    }
  ]
end

[
  # home_training_dodoable,
  meal_dodoable(
    'first',
    'Sandwich & Albumin',
    fields: bool_fields(
      'Water',
      'Coffee',
      'Albumin',
      'Vitamins',
      'Nootropics',
      'Concerta',
      'Brintellix',
    )
  ),
  meal_dodoable('second', 'Yougurt Grains', fields: bool_fields('Albumin', 'Creatin')),
  meal_dodoable('third', 'Frozen Lunch'),
  meal_dodoable('fourth', 'Fish', fields: bool_fields('Albumin', 'Vitamins')),
  meal_dodoable('fifth', 'Fruits', fields: bool_fields('Melatonin', 'Omega 3')),
  practice_dodoable('Music: Guitar', 'music:guitar', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Piano', 'music:piano', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Singing', 'music:singing', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Read', 'read', trigger: { icon: { name: 'book' }}),
  practice_dodoable('Work: Wordable', 'work:wordable', trigger: { icon: { name: 'dollar-sign', component: 'Icon5' }}),
  practice_dodoable('Project: Dodo', 'projects:dodo', trigger: { icon: { name: 'rocket' }}),
  practice_dodoable('Project: Livestock', 'projects:livestock', trigger: { icon: { name: 'line-chart', component: 'Icon' }}),
  practice_dodoable('Exercise: Lake Run', 'exercise:lake-run', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Free', 'exercise:free', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  {
    name: 'Breath Meditation',
    slug: "meditation:breath",
    nature: :independent,
    about_time: :chronometrable,
    trigger: {
      display: '?',
      icon: {
        name: 'buddhism',
        component: 'IconMC'
      }
    },
    fields: {},
  },
  {
    name: 'On Wakeup',
    slug: "chores:wakeup",
    trigger: {
      display: 'Todos',
      icon: {
        name: 'wrench',
        component: 'Icon5'
      }
    },
    fields: {}.merge(
      bool_fields(
        'Water',
        'Coffee',
        'Concerta',
        'Brintellix'
      ).merge(
        comments: {
          type: :text,
          order: 999
        }
      )
    ),
  },
  {
    name: 'Evening Chores',
    slug: "chores:evening",
    trigger: {
      display: 'Todos',
      icon: {
        name: 'wrench',
        component: 'Icon5'
      }
    },
    fields: {}.merge(
      bool_fields(
        'Skincare',
        'Tea',
        'Juice',
        'Water',
        'Setup Coffee',
        'Milk and Albumin',
        'One song cleanup',
        'Melatonin'
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
