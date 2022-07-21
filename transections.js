const session= db.getMOngo().startSession();
session.startTransection();

const UserCol= session.getDatabase("blog").users
const PostCol= session.getDatabase("blog").posts

UserCol.deleteOne({_id:id}) //this will not delete the colelction yet

PostCol.deleteMany({_id:id})

session.commitTransection()
