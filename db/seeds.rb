user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

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
