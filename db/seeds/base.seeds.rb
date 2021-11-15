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
      'Malto Albumin',
      'Sandwish',
      'Concerta',
      'Brintellix',
      'Vitamins',
      'Nootropics',
      'Water',
      'Coffee'
    ).merge({
              comments: {
                type: :text,
                order: 999
              }
            })
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
  jump_wakeup,
  # home_training_dodoable,
  meal_dodoable('first', 'Sandwish and Juice'),
  meal_dodoable('second', 'Frozen Lunch and Juice'),
  meal_dodoable('third', 'Fish', fields: bool_fields('Albumin', 'Creatin')),
  meal_dodoable('fourth', 'Free', fields: bool_fields('Melatonin', 'Omega 3')),
  practice_dodoable('Shredding Investments', 'shredding-investments', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Guitar', 'music:guitar', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Piano', 'music:piano', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Music: Singing', 'music:singing', trigger: { icon: { name: 'music' }}),
  practice_dodoable('Read', 'read', trigger: { icon: { name: 'book' }}),
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
  practice_dodoable('Retirement: First Deep Work', 'retirement:first-deep-work', trigger: { icon: { name: 'white-balance-sunny', component: 'IconMC' }}, nature: :scheduled),
  practice_dodoable('Retirement: Second Deep Work', 'retirement:second-deep-work', trigger: { icon: { name: 'white-balance-sunny', component: 'IconMC' }}, nature: :scheduled),
  practice_dodoable('Project: Dodo', 'projects:dodo', trigger: { icon: { name: 'rocket' }}),
  practice_dodoable('Project: Livestock', 'projects:livestock', trigger: { icon: { name: 'line-chart', component: 'Icon' }}),
  practice_dodoable('Exercise: Lake Run', 'exercise:lake-run', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Free', 'exercise:free', trigger: { icon: { name: 'running', component: 'Icon5' }}),
  practice_dodoable('Exercise: Legacy Dodo', 'exercise:legacy-dodo', trigger: { icon: { name: 'running', component: 'Icon5' }}),
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
        'Journaling',
        'Tea',
        'Juice',
        'Water',
        'Setup Coffee',
        'Prepare Milk and Albumin',
        'Prepare Tomorrow\'s Meals',
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
].each do |dodoable_attributes|
  Dodoable
    .even_inactive
    .where(
      slug: dodoable_attributes[:slug],
      user_id: user.id
    )
    .first_or_create
    .update(dodoable_attributes)
end

def deactivate(*slugs)
  slugs.each do |slug|
    Dodoable.where(slug: slug).update_all(active: false)
  end
end

deactivate('work:wordable',
           'music:piano',
           'music:singing',
           'bad-habit:smoking',
           'bad-habit:league',
           'bad-habit:f1',
           'bad-habit:f5'
          )

def reset_schedule(user)
  user.current_day.dodones.destroy_all
  user.current_day.ensure_scheduled_dodones
end

reset_schedule user
