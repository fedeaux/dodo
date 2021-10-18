json.partial! "/api/dodoables/attributes", dodoable: dodoable

if dodoable.last_dodone
  json.set! :last_dodone do
    json.partial! "/api/dodones/attributes", dodone: dodoable.last_dodone
  end
end

if dodoable.being_tracked_dodone
  json.being_tracked_dodone do
    json.partial! "/api/dodones/attributes", dodone: dodoable.being_tracked_dodone
  end
end

json.todays_dodones do
  json.array! dodoable.todays_dodones do |dodone|
    json.partial! "/api/dodones/attributes", dodone: dodone
  end
end
