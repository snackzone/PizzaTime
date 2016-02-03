class AddAttachmentUploadToPhotos < ActiveRecord::Migration
  def self.up
    change_table :photos do |t|
      t.attachment :upload
    end
  end

  def self.down
    remove_attachment :photos, :upload
  end
end
