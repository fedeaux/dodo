json.dodones do
  json.array! @dodones do |dodone|
    json.partial! "member", dodone: dodone
  end
end

json.cache_key Dodone.cache_key
