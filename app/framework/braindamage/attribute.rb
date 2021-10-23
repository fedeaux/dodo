class Braindamage::Attribute < Braindamage::Struct
  property :name, nil
  property :type, "string"
  property :writeable, true
  property :default, nil

  def fe_name
    unless @fe_name
      @fe_name = name.to_s

      if @fe_name.ends_with? "?"
        @fe_name = "is_#{@fe_name.gsub(/\?$/, '')}"
      end

      @fe_name = @fe_name.camelcase(:lower)
    end

    @fe_name
  end
end
