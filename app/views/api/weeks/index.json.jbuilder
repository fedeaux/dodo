json.weeks do
  json.array! @weeks do |week|
    json.partial! "member", week: week
  end
end

json.cache_key Week.cache_key(@query)
