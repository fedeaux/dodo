json.dodoable do
  json.partial! "member", dodoable: @dodoable

  json.dodones do
    json.array! @dodoable.dodones do |dodone|
      json.partial! "/api/dodones/attributes", dodone: dodone
    end
  end

  json.being_tracked_dodones do
    json.array! @dodoable.being_tracked_dodones do |dodone|
      json.partial! "/api/dodones/attributes", dodone: dodone
    end
  end
end

json.cache_key @dodoable.cache_key
