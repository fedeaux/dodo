json.dodone do
  json.partial! "member", dodone: @dodone
end

json.cache_key @dodone.cache_key
