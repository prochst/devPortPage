/**
 * DateStringFormatter - localize datetime format to Czech
 * @param {string datetime} str 
 * @param {boolean} locale 
 * @returns 
 */
export const DateStringFormatter = (str, locale = false) => {
    const d = new Date(str);

    if (locale) {
        return d.toLocaleDateString('cs-CZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    const year = d.getFullYear();
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();

    return [
        year,
        (month.length < 2) ? ('0' + month) : month,
        (day.length < 2) ? ('0' + day) : day
    ].join('-');
};

export default DateStringFormatter;