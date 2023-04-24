let gridValue = [];
let chars = {
    true: '█',
    false: '░',
};

const setGrid = () => {
    /**
     * @type {HTMLInputElement}
     */
    const column = document.getElementById('config_column');
    /**
     * @type {HTMLInputElement}
     */
    const row = document.getElementById('config_row');

    html = '';
    gridValue = [];

    for (let i = 0; i < row.value; i++) {
        gridValue.push(new Array(Number(column.value)));

        html += '<div class="input_grid_row">';
        column_html = '';
        for (let j = 0; j < column.value; j++) {
            gridValue[i][j] = false;
            column_html += `<div class="input_grid_el false" onclick="changeState(this, ${j}, ${i})"></div>`;
        }
        html += column_html;
        html += '</div>';
    }
    document.getElementById('input_grid').innerHTML = html;
};

const changeState = (element, column, row) => {
    gridValue[row][column] = !gridValue[row][column];
    element.className = `input_grid_el ${gridValue[row][column]}`;
};

const saveConfig = () => {
    setGrid();
    chars.true = document.getElementById('config_char_true').value;
    chars.false = document.getElementById('config_char_false').value;
};

const copyText = () => {
    changeLine = document.getElementById('config_changeLine').checked
        ? '\n'
        : '';
    text = '';
    gridValue.forEach((row) => {
        row.forEach((column) => {
            text += chars[column];
        });
        text += changeLine;
    });
    if (text[text.length - 1] === '\n') {
        text = text.slice(0, -1);
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('func_copy');
            copyBtn.innerText = 'コピーしました';
            setTimeout(() => (copyBtn.innerText = 'コピー'), 2000);
        });
    } else {
        const outputText = document.getElementById('output_text');
        outputText.innerText = text;
        outputText.select();
        document.execCommand('copy');
        const copyBtn = document.getElementById('func_copy');
        copyBtn.innerText = 'コピーしました';
        setTimeout(() => (copyBtn.innerText = 'コピー'), 2000);
    }
};

window.onload = () => {
    setGrid();
};
