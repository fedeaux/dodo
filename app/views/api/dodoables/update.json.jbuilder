json.dodoable do
  json.partial! "member", dodoable: @dodoable
end

json.cache_key @dodoable.cache_key
