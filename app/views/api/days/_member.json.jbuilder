json.partial! "attributes", day: day

json.schedule_dodones do
  json.array! day.schedule_dodones do |dodone|
    json.partial! "/api/dodones/member", dodone: dodone
  end
end
