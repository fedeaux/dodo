json.dodoables do
  json.array! @dodoables do |dodoable|
    json.partial! "member", dodoable: dodoable
  end
end

json.cache_key Dodoable.cache_key
