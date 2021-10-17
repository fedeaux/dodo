json.partial! "/api/dodoables/attributes", dodoable: dodoable

if dodoable.being_tracked_dodone
  json.being_tracked_dodone do
    json.partial! "/api/dodones/attributes", dodone: dodoable.being_tracked_dodone
  end
end
