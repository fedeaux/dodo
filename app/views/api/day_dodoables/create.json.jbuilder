json.day_dodoable do
  json.partial! "member", day_dodoable: @day_dodoable
end

json.cache_key @day_dodoable.cache_key
