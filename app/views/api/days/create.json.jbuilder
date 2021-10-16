json.day do
  json.partial! "member", day: @day
end

json.cache_key @day.cache_key
