json.days do
  json.array! @days do |day|
    json.partial! "member", day: day
  end
end
