function King(pos, dir, id, board){
    this.type = 'king'
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
        if (a > 1){
            this.move_list.push((a-1) + '_' + (b))
            if (!(this.board[a-1][b] === null)){
                if (this.check_friendly(a-1,b)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a > 1) && (b > 1)){
            this.move_list.push((a-1) + '_' + (b-1))
            if (!(this.board[a-1][b-1] === null)){
                if (this.check_friendly(a-1,b-1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a > 1) && (b < 8)){
            this.move_list.push((a-1) + '_' + (b+1))
            if (!(this.board[a-1][b+1] === null)){
                if (this.check_friendly(a-1,b+1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if (a < 8){
            this.move_list.push((a+1) + '_' + (b))
            if (!(this.board[a+1][b] === null)){
                if (this.check_friendly(a+1,b)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a < 8) && (b > 1)){
            this.move_list.push((a+1) + '_' + (b-1))
            if (!(this.board[a+1][b-1] === null)){
                if (this.check_friendly(a+1,b-1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if ((a < 8) && (b < 8)){
            this.move_list.push((a+1) + '_' + (b+1))
            if (!(this.board[a+1][b+1] === null)){
                if (this.check_friendly(a+1,b+1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if (b > 1){
            this.move_list.push((a) + '_' + (b-1))
            if (!(this.board[a][b-1] === null)){
                if (this.check_friendly(a,b-1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        if (b < 8){
            this.move_list.push((a) + '_' + (b+1))
            if (!(this.board[a][b+1] === null)){
                if (this.check_friendly(a,b+1)){
                    this.protected.push(this.move_list.pop())
                }
            }
        }
        let len = this.move_list.length
        let current_player = 1-(this.dir -3) / (-2)
        for (let i = 0; i < len; i++){
            let move = this.move_list[i]
            let len2 = this.pieces[(current_player+1)%2].length
            for (let j = 0; j < len2; j++){
                let piece = this.pieces[(current_player+1)%2][j]
                if (piece.move_list.includes(move) || piece.protected.includes(move)){
                    this.protected.push(this.move_list.splice(i,1)[0])
                    len--;
                    i--;
                    break;
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

export default King;