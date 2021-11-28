json.week do
  json.partial! "member", week: @week
end

json.cache_key @week.cache_key
