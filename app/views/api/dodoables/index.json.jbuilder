json.dodoables do
  json.array! @dodoables do |dodoable|
    json.partial! "member", dodoable: dodoable
  end
end

# TODO: Review collection cache keys
json.cache_key Dodoable.cache_key(@query)
