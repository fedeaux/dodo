user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro', timezone: 'America/Sao_Paulo')

def reslug_dodoable(current_slug, new_slug)
  Dodoable.find_by(slug: current_slug)&.update(slug: new_slug)
end

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

def jump_wakeup
  {
    name: 'Jump Wakeup',
    slug: "jump-wakeup",
    trigger: {
      display: 'Todos',
      icon: {
        component: 'IconMC',
        name: 'silverware'
      }
    },
    fields: bool_fields(
      'Concerta',
      'Brintellix',
      'Water',
      'Ginger Tea'
    ).merge({
              comments: {
                type: :text,
                order: 999
              }
            })
  }
end

def free_training_dodoable
  {
    name: 'Exercise: Home Training',
    nature: :independent,
    slug: "exercise:free-training",
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

def practice_dodoable(name, slug, trigger: {}, nature: :independent, executor: {})
  {
    name: name,
    slug: slug,
    nature: nature,
    trigger: {
      display: 'Empty',
    }.merge(trigger),
    fields: {},
    executor: executor
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
      nature: :independent,
      trigger: {
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
      nature: :independent,
      trigger: {
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
      nature: :independent,
      trigger: {
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
  jump_wakeup,
  free_training_dodoable,
  bad_habits,
  meal_dodoable('first', 'A??a??', fields: bool_fields('Albumin', 'Some Fruit', 'Creatin', 'Vitamins', 'Nootropics')),
  meal_dodoable('second', 'Lunch'),
  meal_dodoable('third', 'Something Fishy'),
  meal_dodoable('fourth', 'Fish', fields: bool_fields('Melatonin', 'Omega 3')),
  practice_dodoable('Shredding Investments', 'shredding-investments', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Guitar', 'music:guitar', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Piano', 'music:piano', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Singing', 'music:singing', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Berimbau', 'music:berimbau', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Pandeiro', 'music:pandeiro', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Theory', 'music:theory', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Read', 'read', trigger: { icon: { name: 'book' }}),
  practice_dodoable('Study: Technical Analysis', 'study:technical-analysis', trigger: { icon: { name: 'line-chart', component: 'Icon' }}),
  practice_dodoable('Study: Investments', 'study:investments', trigger: { icon: { name: 'white-balance-sunny', component: 'IconMC' }}),
  practice_dodoable('Study: Buddhism', 'study:buddhism', trigger: { icon: { name: 'buddhism', component: 'IconMC' }}),
  practice_dodoable('Retirement: Morning Setup',
                    'retirement:morning-setup',
                    trigger: {
                      icon: {
                        name: 'white-balance-sunny',
                        component: 'IconMC'
                      }
                    },
                    nature: :scheduled,
                    executor: {
                      instructions: [
                        'Answer People',
                        'Bureaucracies',
                        'Follow Ups',
                        'Review Trading View',
                        'Setup a few orders'
                      ]
                    }
                   ),
  practice_dodoable('Retirement: Investment Grooming', 'retirement:investment-grooming', trigger: { icon: { name: 'white-balance-sunny', component: 'IconMC' }}, nature: :scheduled),
  practice_dodoable('Retirement: First Deep Work', 'retirement:first-deep-work', trigger: { icon: { name: 'white-balance-sunny', component: 'IconMC' }}, nature: :scheduled),
  practice_dodoable('Retirement: Second Deep Work', 'retirement:second-deep-work', trigger: { icon: { name: 'white-balance-sunny', component: 'IconMC' }}, nature: :scheduled),
  practice_dodoable('Project: Dodo', 'projects:dodo', trigger: { icon: { name: 'rocket' }}),
  practice_dodoable('Project: Livestock', 'projects:livestock', trigger: { icon: { name: 'line-chart', component: 'Icon' }}),
  practice_dodoable('Exercise: Lake Run', 'exercise:lake-run', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Free', 'exercise:free', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Legacy Dodo', 'exercise:legacy-dodo', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Free Treadmill', 'exercise:treadmill:free', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Free Stretch', 'exercise:stretch:free', trigger: { icon: { name: 'yoga', component: 'IconMC' }}),
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
        'Turn Computer Off',
        'Prepare Good Night Tea',
        'Melatonin',
        'Vitamins',
        'Omega 3',
        'Journaling',
        'Quick Cook',
        "Clean things up/Setup tomorrow's tea and tennis",
        'Water',
        'Skin Care',
        'Brush Teeth',
      ).merge(
        comments: {
          type: :text,
          order: 999
        }
      )
    ),
  }
].flatten.each do |dodoable_attributes|
  Dodoable
    .even_inactive
    .where(
      slug: dodoable_attributes[:slug],
      user_id: user.id
    )
    .first_or_create
    .update(dodoable_attributes.merge(active: true))
end

def deactivate(*slugs)
  slugs.each do |slug|
    Dodoable.where(slug: slug).update_all(active: false)
  end
end

deactivate(
  'work:wordable',
  # 'music:piano',
  # 'music:singing',
  'bad-habit:smoking',
  # 'bad-habit:league',
  # 'bad-habit:f1',
  # 'bad-habit:f5'
  'exercise:legacy-dodo',
  'exercise:free-training',
  'read'
)

def reset_schedule(user)
  return if Rails.env.production?

  user.current_day.dodones.destroy_all
  user.current_day.ensure_scheduled_dodones
end

# reset_schedule user
