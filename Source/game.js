let board = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
];

// Truyền tải các ô bàn cờ vào HTML
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('gameMessage');
const resetButton = document.getElementById('resetButton');

// Người chơi
let currentPlayer = 'X';

// Hiển thị bàn cờ
function displayBoard() {
    boardElement.innerHTML = ''; // Xóa hết các ô hiện tại

    // Tạo các ô cờ và thêm vào board
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[row][col] === '.' ? '' : board[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Xử lý click vào ô
            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
}

// Xử lý sự kiện click vào ô
function handleCellClick(row, col) {
    if (board[row][col] === '.') {
        board[row][col] = currentPlayer;
        displayBoard();

        // Kiểm tra chiến thắng
        if (checkWin(currentPlayer)) {
            messageElement.textContent = `Người chơi ${currentPlayer} thắng!`;
            disableBoard();
            return;
        }

        // Kiểm tra hòa
        if (isBoardFull()) {
            messageElement.textContent = "Hòa! Không ai thắng.";
            return;
        }

        // Chuyển lượt
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Lượt của người chơi: ${currentPlayer}`;
    }
}

// Kiểm tra chiến thắng
function checkWin(player) {
    // Kiểm tra các hàng
    for (let row = 0; row < 3; row++) {
        if (board[row].every(cell => cell === player)) return true;
    }

    // Kiểm tra các cột
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
            return true;
        }
    }

    // Kiểm tra các đường chéo
    if (
        (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    ) {
        return true;
    }

    return false;
}

// Kiểm tra bàn cờ đầy
function isBoardFull() {
    return board.every(row => row.every(cell => cell !== '.'));
}

// Disable bàn cờ sau khi có người thắng
function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

// Bắt đầu lại trò chơi
resetButton.addEventListener('click', () => {
    board = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.']
    ];
    currentPlayer = 'X';
    messageElement.textContent = `Lượt của người chơi: ${currentPlayer}`;
    displayBoard();
});

// Khởi tạo trò chơi
displayBoard();
