user = User.create(email: 'test@gmail.com', password: '123456')
board = Board.create(name: 'Board 1', user_id: user.id)

board.lists.create([{name: 'List 1'}, {name: 'List 2'}, {name: 'List 3'}])


board.lists.first(2).each do |list|
  list.tasks.create(title: 'Task 1')
  list.tasks.create(title: 'Task 2')
end