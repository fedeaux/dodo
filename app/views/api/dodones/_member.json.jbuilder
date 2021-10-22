json.partial! "/api/dodones/attributes", dodone: dodone

json.dodoable do
  json.partial! "/api/dodoables/attributes", dodoable: dodone.dodoable
end
