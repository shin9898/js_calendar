/**
 * 駒のライン引数を解析する
 * @returns {Object} {year: number, month: number}
 */
function parseArguments() {
    const args = process.argv.slice(2);
    const currentDate = new Date();

    // デフォルト値（今月/今年）
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;

    if (args.length === 0) {
        return { year, month };
    } else if (args.length === 2 && args[0] === '-m') {
        const inputMonth = parseInt(args[1]);
        validateMonth(inputMonth);
        return { year, month: inputMonth };
    } else {
        throw new Error('Usage: node maim.js [-m month]');
    }
}

/**
 * 月の妥当性をチェック(1-12)
 * @param {string}
 */
function validateMonth(month) {

}

/**
 * カレンダー生成
 */
function generateCalendar(year, month) {

}

/**
 *
 */
function main() {
    try {
        const { year, month } = parseArguments();
        console.log(`Year: ${year}, Month: ${month}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

main();