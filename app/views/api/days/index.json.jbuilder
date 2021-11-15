json.days do
  json.array! @days do |day|
    json.partial! "member", day: day
  end
end

json.cache_key Day.cache_key(@query)
