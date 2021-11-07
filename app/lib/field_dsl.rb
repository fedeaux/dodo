class FieldDsl
  def self.resolve(fields)
    order = -1

    fields.map do |name, options|
      order += 1
      label = name.to_s.titleize

      options = {
        name: name,
        label: label,
        order: order,
        default: ''
      }.merge(options)

      if options[:type].to_sym == :select
        options[:placeholder] = "Select #{label}"
      end

      if options[:type].to_sym == :collection
        options[:fields] = FieldDsl.resolve options[:fields]
      end

      [name, options]
    end.to_h
  end
end
