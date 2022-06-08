import Pawn from './pieces/pawn.js';
import Knight from './pieces/knight.js';
import Bishop from './pieces/bishop.js';
import Rook from './pieces/rook.js';
import Queen from './pieces/queen.js';
import King from './pieces/king.js';
import getImg from "./getImg/getImg.js";
import getImgPromotion from './getImg/getImgPromotion.js';
import getImgGuide from './getImg/getImgGuide.js';


const game_page = document.querySelector('#game')
const board_element = document.querySelector('#board')
const player1_type_selector = document.querySelector('#player1')
const player2_type_selector = document.querySelector('#player2')
const player1_promotion_screen = document.querySelector('#promotion1')
const player2_promotion_screen = document.querySelector('#promotion2')
const Forfeit_button = document.querySelector('#forfeit')
var board = new Array(9)
for (let i = 0; i < 10; i++){
    board[i] = new Array(9).fill(null)
}
var selector = new Array(9)
for (let i = 0; i < 9; i++){
    selector[i] = new Array(9).fill(false)
}
var p1_hidden = 'Fighting'
var p2_hidden = 'Normal'
var highlights = []
var pieces = []
var stage = 0
//stage 0: player select
//stage 1: select piece
//stage 2: move piece
//stage 3: game over
var ready = false
var selected_piece = null
var current_player = 0
var in_check = false

function start_game(){
    document.querySelector('#new_game_select').setAttribute('hidden', true)
    document.querySelector('#new_game').removeAttribute('hidden')
    Forfeit_button.removeAttribute('hidden')
    game_page.removeAttribute('hidden')
    let p1_pieces = make_pieces(player1_type_selector.value, 1)
    let p2_pieces = make_pieces(player2_type_selector.value, 2)
    getImgGuide(player1_type_selector.value, 0, 1)
    getImgGuide(player2_type_selector.value, 0, 2)
    for (let a = 1; a < 5; a++){
        getImgPromotion(player1_type_selector.value, a, 1)
        getImgPromotion(player2_type_selector.value, a, 2)
        getImgGuide(player1_type_selector.value, a, 1)
        getImgGuide(player2_type_selector.value, a, 2)
    }
    getImgGuide(player1_type_selector.value, 5, 1)
    getImgGuide(player2_type_selector.value, 5, 2)
    pieces = [p1_pieces, p2_pieces]
    for (let a = 0; a < 2; a++){
        for (let b = 0 ; b < 16; b++){
            pieces[a][b].pieces = pieces
        }
    }
    turn()
}

function make_pieces(type, player){
    let mk_pieces = []
    let dir = player * (-2) + 3
    let r = player * 7 - 6
    let r2 = r + dir
    let pawn = null
    let k = new King([r, 5], dir, ('p' + player + 'king'), board)
    board[r][5] = k
    mk_pieces.push(k)
    for (let i = 1; i < 9; i++){
        pawn = new Pawn([r2, i], dir, ('p' + player + 'pawn' + i), board)
        board[r2][i] = pawn
        mk_pieces.push(pawn)
    }
    let k1 = new Knight([r, 2], dir, ('p' + player + 'knight' + 1), board)
    board[r][2] = k1
    mk_pieces.push(k1)
    let k2 = new Knight([r, 7], dir, ('p' + player + 'knight' + 2), board)
    board[r][7] = k2
    mk_pieces.push(k2)
    let b1 = new Bishop([r, 3], dir, ('p' + player + 'bishop' + 1), board)
    board[r][3] = b1
    mk_pieces.push(b1)
    let b2 = new Bishop([r, 6], dir, ('p' + player + 'bishop' + 2), board)
    board[r][6] = b2
    mk_pieces.push(b2)
    let R1 = new Rook([r, 1], dir, ('p' + player + 'rook' + 1), board)
    board[r][1] = R1
    mk_pieces.push(R1)
    let R2 = new Rook([r, 8], dir, ('p' + player + 'rook' + 2), board)
    board[r][8] = R2    
    mk_pieces.push(R2)
    let q = new Queen([r, 4], dir, ('p' + player + 'queen'), board)
    board[r][4] = q
    mk_pieces.push(q)
    getImg(type, 5, k)
    for (let i = 1; i < 9; i++){
            getImg(type, 0, mk_pieces[i])
    }
    getImg(type, 1, k1)
    getImg(type, 1, k2)
    getImg(type, 2, b1)
    getImg(type, 2, b2)
    getImg(type, 3, R1)
    getImg(type, 3, R2)
    getImg(type, 4, q)
    return mk_pieces
}


function turn(){
    // console.log(board)
    let len = pieces[1-current_player].length
    for (let i = 0; i < len; i++){
        pieces[1-current_player][i].get_moves()
    } 
    len = pieces[current_player].length
    for (let i = 0; i < len; i++){
        pieces[current_player][i].get_moves()
    }

    check_check()
    highlight_pieces()
}

function coords_to_pos(coords){
    return coords[0] + '_' + coords[1]
}

function get_atticking_piece_counter_list(piece, king_coords){
    let attacking_piece_counter_list = []
    attacking_piece_counter_list.push(coords_to_pos(piece.pos))
    if (!(['knight', 'pawn'].includes(piece.type))){
        let kv = parseInt(king_coords[0])
        let kh = parseInt(king_coords[1])
        let pv = parseInt(piece.pos[0])
        let ph = parseInt(piece.pos[1])
        let v = kv - pv
        let h = kh - ph
        let dv = 0
        let dh = 0
        if (v > 0){
            dv = 1
        } else if (v < 0){
            dv = -1
        }
        if (h > 0){
            dh = 1
        } else if (h < 0){
            dh = -1
        }
        for (let a = pv+dv,b = ph+dh; a != kv, b != kh; a+=dv,b+=dh){
            attacking_piece_counter_list.push(coords_to_pos([a,b]))
        }
    }
    return attacking_piece_counter_list
}

function check_check(){
    let check = 0
    in_check = false
    let king_coords = pieces[current_player][0].pos
    let king_pos = coords_to_pos(king_coords)
    let len = pieces[1-current_player].length
    for (let i = 0; i < len; i++){
        let attacking_piece = pieces[1-current_player][i]
        let attacking_move_list = attacking_piece.move_list
        if (attacking_move_list.includes(king_pos)){
            let attacking_piece_counter_list = get_atticking_piece_counter_list(attacking_piece, king_coords)
            check++
            in_check = true
            let len2 = pieces[current_player].length
            for (let k = 1; k < len2; k++){
                let deffending_move_list = pieces[current_player][k].move_list
                let len3 = deffending_move_list.length
                for (let j = 0; j < len3; j++){
                    if (!(attacking_piece_counter_list.includes(deffending_move_list[j]))){
                        deffending_move_list.splice(j,1)
                        j--
                        len3--
                    }
                }
            }
        }
    } 
    if (check > 2){
        if (pieces[current_player][0].move_list.length == 0)
            end_game((current_player + 1) % 2)
    }
    if (check){
        console.log('check')
    }
}

function highlight_pieces(){
    remove_highlights()
    reset_selector()
    stage = 1
    let len = pieces[current_player].length
    for (let i = 0; i < len; i++){
        let piece = pieces[current_player][i]
        if (piece.move_list.length == 0){continue;}
        let pos = piece.pos
        let a = pos[0]
        let b = pos[1]
        add_highlight(a + '_' + b)
        selector[a][b] = 1
    }
    if (highlights.length == 0){
        if (in_check){
            end_game(1+current_player)
        } else {
            stalemate()
        }
    }
    ready = true
}

function add_highlight(pos){
    let element = document.createElement('div')
    element.classList.add('selector_highlight')
    element.setAttribute('id', 'h' + pos)
    document.querySelector('#t' + pos).appendChild(element)
    highlights.push(element)
}

function action_handler(pos){
    if (ready){
        let coords = pos.split('_').map(num => parseInt(num))
        if (selector[coords[0]][coords[1]]){
            ready = false
            switch(stage){
                case 1:
                    select_piece(pos)
                    break;
                case 2:
                    make_move(pos)
            }
        }
    }
}

function select_piece(pos){
    reset_selector()
    remove_highlights()
    stage = 2
    let coords = pos.split('_')
    let a = coords[0]
    let b = coords[1]
    selector[a][b] = 1
    add_highlight(a + '_' + b)
    selected_piece = board[a][b]
    let len = selected_piece.move_list.length
    for (let i = 0; i < len; i++){
        let move = selected_piece.move_list[i]
        add_highlight(move)
        let coords2 = move.split('_')
        selector[coords2[0]][coords2[1]] = 1
    }
    ready = true
}

function make_move(pos){
    if ((coords_to_pos(selected_piece.pos)) == pos){
        selected_piece = null
        highlight_pieces()
        return
    }
    let coords = pos.split('_')
    let a = coords[0]
    let b = coords[1]
    if (!(board[a][b] === null)){
        let attacked_piece = board[a][b]
        attacked_piece.img_element.remove()
        let i = pieces[(current_player +1)%2].indexOf(attacked_piece)
        pieces[(current_player +1)%2].splice(i, 1)
    }
    board[a][b] = selected_piece
    selected_piece.move(coords)
    current_player = (current_player +1)%2
    reset_selector()
    remove_highlights()
    turn()
}

function remove_highlights(){
    let len = highlights.length
    for ( let i = 0; i < len; i++){

        highlights[i].remove()
    }
    highlights = []
}

function reset_selector(){
    for (let i = 0; i < 9; i++){
        selector[i] = Array(9).fill(0)
    }
}

function new_game(){
    location.reload()
}

function end_game(player){
    stage = 3
    Forfeit_button.setAttribute('hidden', true)
    game_page.setAttribute('hidden', true)
    document.querySelector('#game_end').removeAttribute('hidden')
    document.querySelector('#winner').textContent = (3 - player)
}

function stalemate(){
    stage = 3
    Forfeit_button.setAttribute('hidde', true)
    game_page.setAttribute('hidden', true)
    document.querySelector('#stalemate').removeAttribute('hidden')
}

function promotion(num, piece){
    let new_piece = null
    let element = piece.img_element
    let img = null
    let player = (piece.dir - 3) / (-2)
    let index = pieces[player-1].indexOf(piece)
    switch (num){
        case 1:
            new_piece = new Knight(piece.pos, piece.dir, piece.id, board)
            img = document.querySelector('#promotion' + player + 'Knight').src
            element.setAttribute('src',img)
        case 2:
            new_piece = new Bishop(piece.pos, piece.dir, piece.id, board)
            img = document.querySelector('#promotion' + player + 'Bishop').src
            element.setAttribute('src',img)
        case 3:
            new_piece = new Rook(piece.pos, piece.dir, piece.id, board)
            img = document.querySelector('#promotion' + player + 'Rook').src
            element.setAttribute('src',img)
        case 4:
            new_piece = new Queen(piece.pos, piece.dir, piece.id, board)
            img = document.querySelector('#promotion' + player + 'Queen').src
            element.setAttribute('src',img)
    }
    new_piece.set_pic(img, element)
    new_piece.pieces = pieces
    new_piece.moved = true
    pieces[player-1][index] = new_piece
    board[new_piece.pos[0]][new_piece.pos[1]] = new_piece
}

// event listeners
board_element.addEventListener('click', function(e){
    let target = e.target.closest("td")
    let pos = target.id
    // console.log('click', pos)
    action_handler(pos.substring(1))
})
player1_type_selector.addEventListener('change', function(){
    let type = player1_type_selector.value
    let old_str = '#p2_' + p1_hidden
    let new_str = '#p2_' + type
    document.querySelector(old_str).removeAttribute('hidden')
    document.querySelector(new_str).setAttribute('hidden', true)
    p2_hidden = type
} )
player2_type_selector.addEventListener('change', function(){
    let type = player2_type_selector.value
    let old_str = '#p1_' + p2_hidden
    let new_str = '#p1_' + type
    document.querySelector(old_str).removeAttribute('hidden')
    document.querySelector(new_str).setAttribute('hidden', true)
    p1_hidden = type
} )
document.querySelector('#start_game').addEventListener('click', start_game)
document.querySelector('#new_game').addEventListener('click', new_game)
document.querySelector('#promotion1Knight').addEventListener('click', function(){
    promotion(1, selected_piece)
    player1_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion1Bishop').addEventListener('click', function(){
    promotion(2, selected_piece)
    player1_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion1Rook').addEventListener('click', function(){
    promotion(3, selected_piece)
    player1_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion1Queen').addEventListener('click', function(){
    promotion(4, selected_piece)
    player1_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion2Knight').addEventListener('click', function(){
    promotion(1, selected_piece)
    player2_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion2Bishop').addEventListener('click', function(){
    promotion(2, selected_piece)
    player2_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion2Rook').addEventListener('click', function(){
    promotion(3, selected_piece)
    player2_promotion_screen.setAttribute('hidden', true)
})
document.querySelector('#promotion2Queen').addEventListener('click', function(){
    promotion(4, selected_piece)
    player2_promotion_screen.setAttribute('hidden', true)
})
Forfeit_button.addEventListener('click', function(){
    end_game(1+current_player)
})