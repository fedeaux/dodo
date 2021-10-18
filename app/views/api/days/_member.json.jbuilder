json.partial! "attributes", day: day

json.dodoables do
  json.array! day.dodoables do |dodoable|
    json.partial! "/api/dodoables/member", dodoable: dodoable
  end
end
