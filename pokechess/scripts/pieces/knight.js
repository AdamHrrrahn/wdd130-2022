function Knight(pos, dir, id, board){
    this.type = 'knight'
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
        if ((a+1 < 9)&&(b+2 < 9)){
            this.move_list.push((a + 1) + '_' + (b + 2))
            if (!(this.board[a + 1][b + 2] === null)){
                if (this.check_friendly(a+1,b+2)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a+2 < 9)&&(b+1 < 9)){
            this.move_list.push((a + 2) + '_' + (b + 1))
            if (!(this.board[a + 2][b + 1] === null)){
                if (this.check_friendly(a+2,b+1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a-1 > 0)&&(b+2 < 9)){
            this.move_list.push((a - 1) + '_' + (b + 2))
            if (!(this.board[a - 1][b + 2] === null)){
                if (this.check_friendly(a-1,b+2)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a-2 > 0)&&(b+1 < 9)){
            this.move_list.push((a - 2) + '_' + (b + 1))
            if (!(this.board[a - 2][b + 1] === null)){
                if (this.check_friendly(a-2,b+1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a+1 < 9)&&(b-2 > 0)){
            this.move_list.push((a + 1) + '_' + (b - 2))
            if (!(this.board[a + 1][b - 2] === null)){
                if (this.check_friendly(a+1,b-2)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a+2 < 9)&&(b-1 > 0)){
            this.move_list.push((a + 2) + '_' + (b - 1))
            if (!(this.board[a + 2][b - 1] === null)){
                if (this.check_friendly(a+2,b-1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a-1 > 0)&&(b-2 > 0)){
            this.move_list.push((a - 1) + '_' + (b - 2))
            if (!(this.board[a - 1][b - 2] === null)){
                if (this.check_friendly(a-1,b-2)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a-2 > 0)&&(b-1 > 0)){
            this.move_list.push((a - 2) + '_' + (b - 1))
            if (!(this.board[a - 2][b - 1] === null)){
                if (this.check_friendly(a-2,b-1)){
                    this.protected.push(this.move_list.pop())
                }
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


export default Knight;