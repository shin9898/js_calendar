const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * その月の日数を取得
 */
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

/**
 * その月の1日が何曜日か取得（0=日曜日）
 */
function getFirstDayOfWeek(year, month) {
    return new Date(year, month - 1, 1).getDay();
}

/**
 * 月の妥当性をチェック(1-12)
 * @param {number} month - チェックする月(1-12)
 * @throws {Error} 不正な月の場合
 */
function validateMonth(month) {
    if (isNaN(month) || month < 1 || month > 12) {
        throw new Error(`cal: ${month}: bad month`);
    }
}

/**
 * ヘッダー生成("   April 2025"のような形式)
 */
function generateHeader(year, month) {
    const monthName = MONTH_NAMES[month - 1];
    const headerText = `${monthName} ${year}`;
    const totalWidth = 20;
    const padding = Math.floor((totalWidth - headerText.length) / 2);
    return ' '.repeat(padding) + headerText;
}

/**
 * 日付行を生成する
 * @param {number} year - 年
 * @param {number} month - 月(1-12)
 * @returns {string} 日付行の文字列
 */
function generateDateRows(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);

    let result = '';
    let dayCount = 1;

    for (let week = 0; week < 6; week++) {
        let weekRow = '';
        for (let day = 0; day < 7; day++) {
            if (week === 0 && day < firstDayOfWeek) {
                weekRow += '   ';
            } else if (dayCount > daysInMonth) {
                weekRow += '   ';
            } else {
                weekRow += dayCount.toString().padStart(2, ' ') + ' ';
                dayCount++;
            }
        }
        result += weekRow.trimEnd() + '\n';
        if (dayCount > daysInMonth) {
            break;
        }
    }
    return result.trimEnd();
}

/**
 * カレンダー生成
 * @param {number} year - 年
 * @param {number} month - 月(1-12)
 * @returns {string} フォーマットされたカレンダー
 */
function generateCalendar(year, month) {
    const header = generateHeader(year, month);
    const dayRow = "Su Mo Tu We Th Fr Sa";
    const dateRows = generateDateRows(year, month);
    return `${header}\n${dayRow}\n${dateRows}`;
}

/**
 * コマンドライン引数を解析する
 * @returns {Object} {year: number, month: number}
 */
function parseArguments() {
    const args = process.argv.slice(2);
    const currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;

    if (args.length === 0) {
        return { year, month };
    } else if (args.length === 2 && args[0] === '-m') {
        const inputMonth = parseInt(args[1]);
        validateMonth(inputMonth);
        return { year, month: inputMonth };
    } else {
        throw new Error('Usage: node main.js [-m month]');
    }
}

/**
 * メイン関数
 */
function main() {
    try {
        const { year, month } = parseArguments();
        console.log(generateCalendar(year, month));
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

// =====================================
// プログラム実行
// =====================================
main();