task :release do
  Rake::Task["db:seed"].invoke
end
