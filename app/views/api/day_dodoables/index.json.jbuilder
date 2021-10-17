json.day_dodoables do
  json.array! @day_dodoables do |day_dodoable|
    json.partial! "member", day_dodoable: day_dodoable
  end
end

json.cache_key DayDodoable.cache_key
