function Pawn(pos, dir, id, board){
    this.type = 'pawn'
    this.board = board
    this.pieces = null
    this.id = id
    this.img = null
    this.pos = pos
    this.dir = dir
    this.moved = false
    this.move_list = []
    this.protected = []
    this.img_element = null
    this.move = function(target){
        this.img_element.remove()
        this.board[this.pos[0]][this.pos[1]] = null
        this.pos = target
        let num = 4.5 + 3.5*dir
        if (target[0] == num){
            this.enable_promotion()      
        } 
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
        if (this.board[a+this.dir][b] === null){
            this.move_list.push((a+this.dir) + '_' + b)
            if (!this.moved){
                if (this.board[a+(2*this.dir)][b] === null){
                    this.move_list.push((a+(2*this.dir)) + '_' + b)
                }
            }
        }
        if (b > 1){
            if (!(this.board[a+this.dir][b-1] === null)){
                if (!(this.check_friendly(a+this.dir,b-1))){
                    this.move_list.push((a+this.dir) + '_' + (b-1))
                 }else{
                    this.protected.push((a+this.dir) + '_' + (b-1))

                }
            }
        }
        if (b < 8){
            if (!(this.board[a+this.dir][b+1] === null)){
                if (!(this.check_friendly(a+this.dir,b+1))){
                    this.move_list.push((a+this.dir) + '_' + (b+1))
                } else{
                    this.protected.push((a+this.dir) + '_' + (b+1))

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

    this.enable_promotion = function(){
        let num = (dir - 3) / (-2)
        document.querySelector('#promotion' + num).removeAttribute('hidden')
    }
    this.set_pic = function(img, element){
        this.img = img
        this.img_element = element
    }
}

export default Pawn;