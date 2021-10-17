json.dodoables do
  json.array! @dodoables do |dodoable|
    json.partial! "member", dodoable: dodoable

    json.dodones do
      json.array! dodoable.dodones do |dodone|
        json.partial! "/api/dodones/attributes", dodone: dodone
      end
    end

    if dodoable.being_tracked_dodone
      json.being_tracked_dodone do
        json.partial! "/api/dodones/attributes", dodone: dodoable.being_tracked_dodone
      end
    end
  end
end

json.cache_key Dodoable.cache_key
