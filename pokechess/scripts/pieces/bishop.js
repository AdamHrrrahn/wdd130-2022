function Bishop(pos, dir, id, board){
    this.type = 'bishop'
    this.board = board
    this.pieces = null
    this.id = id
    this.img = null
    this.pos = pos
    this.dir = dir
    this.moved = false
    this.move_list = []
    this.protected = []
    this.move = function(target){
        this.img_element.remove()
        this.board[this.pos[0]][this.pos[1]] = null
        this.pos = target
        document.querySelector('#t' + target[0] + '_' + target[1]).appendChild(this.img_element)
        this.board[this.pos[0]][this.pos[1]] = this
        this.moved = true
    }
    this.can_move = function(){
        return (move_list.length > 0)
    }
    this.get_moves = function(){
        this.move_list = []
        this.protected = []
        let a = parseInt(this.pos[0]);
        let b = parseInt(this.pos[1]);
        for (let i = 1; (i+a < 9)&&(i+b < 9); i++){
            this.move_list.push((a + i) + '_' + (b + i))
            if (!(this.board[a + i][b + i] === null)){
                if (this.check_friendly(a+i,b+i)){
                    this.protected.push(this.move_list.pop())
                } else if (this.board[a+i][b+i].type == 'king'){
                    this.protected.push((a+i+1) + '_' + (b+i+1))
                }
                break;
            }
        }
        for (let i = 1; (a-i > 0)&&(i+b < 9); i++){
            this.move_list.push((a - i) + '_' + (b + i))
            if (!(this.board[a - i][b + i] === null)){
                if (this.check_friendly(a-i,b+i)){
                    this.protected.push(this.move_list.pop())
                } else if (this.board[a-i][b+i].type == 'king'){
                    this.protected.push((a-i-1) + '_' + (b+i+1))
                }
                break;
            }
        }
        for (let i = 1; (i+a < 9)&&(b-i > 0); i++){
            this.move_list.push((a + i) + '_' + (b - i))
            if (!(this.board[a + i][b - i] === null)){
                if (this.check_friendly(a+i,b-i)){
                    this.protected.push(this.move_list.pop())
                } else if (this.board[a+i][b-i].type == 'king'){
                    this.protected.push((a+i+1) + '_' + (b-i-1))
                }
                break;
            }
        }
        for (let i = 1; (a-i > 0)&&(b-i > 0); i++){
            this.move_list.push((a - i) + '_' + (b - i))
            if (!(this.board[a - i][b - i] === null)){
                if (this.check_friendly(a-i,b-i)){
                    this.protected.push(this.move_list.pop())
                } else if (this.board[a-i][b-i].type == 'king'){
                    this.protected.push((a-i-1) + '_' + (b-i-1))
                }
                break;
            }
        }
      }
    this.check_friendly = function (a,b){
        if (this.board[a][b].dir == this.dir){
            return true
        } else{
            return false
        }
    }
    this.set_pic = function(img, element){
        this.img = img
        this.img_element = element
    }
}

export default Bishop;