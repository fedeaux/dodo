json.day do
  json.partial! "member", day: @day

  json.dodoables do
    json.array! @day.dodoables do |dodoable|
      json.partial! "/api/dodoables/member", dodoable: dodoable
    end
  end
end

json.cache_key @day.cache_key
